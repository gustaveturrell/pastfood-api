const express = require('express');
const recipeController = require('../controllers/recipeController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');
const router = express.Router();

router.use('/:id/reviews', reviewRouter);

// 1) Routes pour créer et récupérer toutes les recettes
router
  .route('/')
  .get(recipeController.getAllRecipe)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    recipeController.createRecipe
  );

// 2) Routes pour avec une recette, mettre à jour (admin), la supprimer (admin)
router
  .route('/:id')
  .get(recipeController.getRecipe)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    recipeController.updateRecipe
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    recipeController.deleteRecipe
  );

module.exports = router;
