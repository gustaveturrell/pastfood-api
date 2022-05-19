const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

/////////////////////////////////////////////////////////////////
// Controller spécifique à reviewRoutes /!\

// 1) Fonction pour filtrer les élements à rechercher
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// 3) Mise à jour des informations utiisateurs
exports.updateMe = catchAsync(async (req, res, next) => {
  /* 3A) Créer une erreur si l'utilisateur essaye de changer son mot de passe
  car sinon une tierce personne peut changer le mot de passe facilement sans /authController
  */
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        `Cette route n'est pas pour la mise à jour de mot de passe. Esssayez /updateMyPassword.`,
        400
      )
    );
  }

  /* 3B) Filtre les champs non autorisé pour la mise à jour sinon
  une tierce personne peut changer son rôle
  */
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3C) Met à jour les informations de l'utilisateur
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// 4) Suprimmer son compte (se rendre inactif)
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: `Cette route n'est pas encore définie, S'il vous plait utilisez SignUp`,
  });
};

/////////////////////////////////////////////////////////////////
// handlerFactory: fonction réutilisable pour plusieurs route /!\
/* 
1) Permet de mettre un jour à utilisateur /!\ admin only /!\
(Ne pas essayer de changer le mot de passe avec cette fonction)
*/
exports.updateUser = factory.updateOne(User);
// 2) Permet de suprimmer un utilisateur /!\ admin only /!\
exports.deleteUser = factory.deleteOne(User);

// 3)  Permet rechercher un utilisateur
exports.getUser = factory.getOne(User);

// 4) Rechercher tout les utilisateurs
exports.getAllUsers = factory.getAll(User);
