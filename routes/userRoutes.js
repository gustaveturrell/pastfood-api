const express = require('express');
const userController = require('./../controllers/userController');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
const router = express.Router();

// 1) Routes pour s'inscrire et se connecter
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// 2)Routes pour réinitialiser le mot de passe (quand celui ci est oublié)
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// _____ PROTEGE TOUTES LES ROUTES EN DESSOUS ______ //
router.use(authController.protect);

// 1)Routes pour réinitialiser une fois connecter
router.patch('/updateMyPassword', authController.updatePassword);

// 2) Routes pour suprimmer son compte
router.delete('/deleteMe', userController.deleteMe);

// 3) Routes pour réinitialiser les informations utilisateurs
router.patch('/updateMe', userController.updateMe);

// 4) Routes pour que l'utilisateur obtiennent ses informations
router.get('/me', userController.getMe, userController.getUser);

// _____ TOUTES LES ROUTES EN DESSOUS ACCESSIBLE UNIQUEMENT POUR ADMIN  ______ //
router.use(authController.restrictTo('admin'));

// 1) Routes pour avoir tout les utilisateurs et créer un utilisateur
router
  .route('/')
  .get(userController.getAllUsers)
  // routes pas encore définie
  .post(userController.createUser);

//2) Route pour avoir un utilisateur en fonction de son ID
router
  .route('/:id')
  .delete(userController.deleteUser)
  .patch(userController.updateUser)
  .get(userController.getUser);

module.exports = router;
