const Recipe = require('../models/recipeModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

/////////////////////////////////////////////////////////////////
// handlerFactory: fonction réutilisable pour plusieurs route /!\

// 1) Permet de rechercher toutes les recettes présente dans la base de donnée:
exports.getAllRecipe = factory.getAll(Recipe);

// 2) Permet d'importer une recette dans la base de donnée
exports.createRecipe = factory.createOne(Recipe);

// 3) Permet de mettre à jour une recette
exports.updateRecipe = factory.updateOne(Recipe);

// 4) Permet de suprimmer une recette
exports.deleteRecipe = factory.deleteOne(Recipe);

// 5) Permet de rechercher une recette et les reviews (populate)
exports.getRecipe = factory.getOne(Recipe, { path: 'reviews' });
