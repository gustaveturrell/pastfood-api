const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
require('mongoose-schema-jsonschema')(mongoose);

/*
1) Le sous-schema pour la source primaire
*/
const sourceSubDoc = new mongoose.Schema({
  _id: false,
  ISBN: {
    type: String,
    validate: validator.isISBN,
  },
  URI: {
    scheme: {
      type: String,
      enum: ['DOI', 'ARK'],
      required: function () {
        return this.ressource != null;
      },
    },
    ressource: {
      type: String,
      required: function () {
        return this.scheme != null;
      },
    },
  },
  ref: {
    type: String,
    validate: validator.isURL,
  },
  lang: {
    type: String,
    enum: ['fr', 'en'],
    required: function () {
      return this.URI != null || this.ISBN != null;
    },
  },
  author: {
    type: String,
    required: true,
    required: function () {
      return this.URI != null || this.ISBN != null;
    },
  },
  title: {
    type: String,
    required: function () {
      return this.URI != null || this.ISBN != null;
    },
  },
  date: {
    type: String,
    required: function () {
      return this.URI != null || this.ISBN != null;
    },
    maxlength: 4,
    minlength: 4,
  },
});

/*
2) Le sous-schema pour la description
*/
const descriptionSubDoc = new mongoose.Schema({
  _id: false,
  name: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    enum: ['moyen-âge', 'époque-moderne', 'époque-contemporaine'],
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  source: sourceSubDoc,
});

/*
3) Le sous-schema pour l'ingrédient
*/
const ingredientSubDoc = new mongoose.Schema({
  _id: false,
  unit: {
    type: String,
  },
  minimun: {
    type: Number,
  },
  maximun: {
    type: Number,
  },
  wikidataQID: {
    type: String,
    required: true,
  },
  _ingTranscript: {
    type: String,
    required: true,
  },
  _ingTranslated: {
    type: String,
  },
});

/*
6) Le sous-schema pour l'instruction
*/
const instructionSubDoc = new mongoose.Schema({
  _id: false,
  key: {
    type: Number,
    required: true,
  },
  _textTranscript: {
    type: String,
    required: true,
  },
  _textTranslated: {
    type: String,
  },
});

/*
7) Le schema de la recette avec les sous-schema
*/
const recipeSchema = new mongoose.Schema(
  {
    slug: String,

    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
      set: (values) => Math.round(values * 10) / 10,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: descriptionSubDoc,
      required: true,
    },
    ingredientsAll: {
      type: [ingredientSubDoc],
      required: true,
      validate: [
        (array) => array.length >= 2,
        'Doit avoir minimun deux ingrédients',
      ],
    },
    instructionsAll: {
      type: [instructionSubDoc],
      required: true,
      validate: [
        (array) => array.length >= 2,
        'Doit avoir minimun deux instructions',
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// const jsonSchema = recipeSchema.jsonSchema();
// console.dir(jsonSchema, { depth: null });

// Indexes: pour recherche plus efficace
recipeSchema.index({ slug: 1 });

// ______ Virtual properties  ______
// Virtual populate: pour avoir les informations sans les stockées dans la base
recipeSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'refToRecipe',
  localField: '_id',
});

// Virtual properties: pour attribuer le checking des sources

recipeSchema.virtual('_primarySource').get(function () {
  if (
    this.description.source.ISBN === undefined ||
    this.description.source.URI === undefined
  ) {
    return false;
  } else {
    return true;
  }
});

//
// ______ Middleware ______
/*
    
Middleware pour mettre en minuscule les ingrédients pour l'intérropérabilité  
*/
recipeSchema.pre('save', function (next) {
  this.ingredientsAll.forEach((obj) => {
    obj._ingTranscript = obj._ingTranscript.toLowerCase();
    obj._ingTranslated = obj._ingTranslated.toLowerCase();
  });

  next();
});

/*
Middleware pour créer un nom de ressource lisible pour l'homme 
*/
recipeSchema.pre('save', function (next) {
  this.slug = slugify(this.description.name, { lower: true });
  next();
});

/*
Middleware pour ajouter une majuste aux premier mot de name
*/

descriptionSubDoc.pre('save', function (next) {
  function firstLetterUpper(name) {
    let [firstWord, ...rest] = name.split(' ');
    firstWord = firstWord.replace(firstWord[0], firstWord[0].toUpperCase());
    rest = rest.join(' ');
    const nameNormalized = [firstWord, rest].join(' ');
    return nameNormalized;
  }

  this.name = firstLetterUpper(this.name);

  next();
});

/*
Middleware pour set le champ "ref" en reconstituant l'URI (overide "ref")
*/
sourceSubDoc.pre('save', function (next) {
  if (this.URI != null) {
    if (this.URI.scheme === 'DOI') {
      this.ref = `https://doi.org/${this.URI.ressource}`;
    }
    if (this.URI.scheme === 'ARK') {
      this.ref = `https://gallica.bnf.fr/ark:/${this.URI.ressource}`;
    }
  }
  next();
});

/*
Middleware recréer le lien pour consulter la page wikidata de l'ingrédient
*/
ingredientSubDoc.pre('save', function (next) {
  this.wikidataQID = `https://www.wikidata.org/entity/${this.wikidataQID}`;
  next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
