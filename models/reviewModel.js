const mongoose = require('mongoose');
const { startSession } = require('./recipeModel');
const Recipe = require('./recipeModel');
const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: 144,
    },
    refToRecipe: {
      type: mongoose.Schema.ObjectId,
      ref: 'Recipe',
      required: [true, 'Une review doit appartenir à une recette '],
    },
    refToUser: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Une review doit avoir un utilisateur'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtual: true } }
);

// Pour que chaque utilisateur post une seul review
reviewSchema.index({ refToRecipe: 1, refToUser: 1 }, { unique: true });

// _____ Middleware _____
// 1) Pre-document middleware: Populate les champs refToRecipe && refToUser avec les informations nécessaire
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'refToUser',
    select: 'name',
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (recipeId) {
  // console.log(recipeId);
  const stats = await this.aggregate([
    {
      $match: { refToRecipe: recipeId },
    },
    {
      $group: {
        _id: '$refToRecipe',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  console.log(stats);

  if (stats.length > 0) {
    await Recipe.findByIdAndUpdate(recipeId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Recipe.findByIdAndUpdate(recipeId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.refToRecipe);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  this.r.constructor.calcAverageRatings(this.r.refToRecipe);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
