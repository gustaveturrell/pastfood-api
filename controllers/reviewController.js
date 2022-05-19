const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

/* Nested routes:
  1A) remplace refToRecipe par l'ID de ma recette présent dans le lien
  1B) remplace refToUser par l'ID de l'utilisateur présent dans authController.protect
  (req.user = currentUser)
*/
exports.setRecipeUserIds = (req, res, next) => {
  if (!req.body.refToRecipe) req.body.refToRecipe = req.params.id;
  if (!req.body.refToUser) req.body.refToUser = req.user.id;

  next();
};

/////////////////////////////////////////////////////////////////
// handlerFactory: fonction réutilisable pour plusieurs route /!\

// 1) Permet de créer une review
exports.createReview = factory.createOne(Review);
// 2) Permet de suprimmer une review
exports.deleteReview = factory.deleteOne(Review);
// 3) Permet de mettre à jour une review
exports.updateReview = factory.updateOne(Review);
// 4) Permet de rechercher une review
exports.getReview = factory.getOne(Review);
// 5) Récuper toutes les reviews
exports.getAllReview = factory.getAll(Review);
