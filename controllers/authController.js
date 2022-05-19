const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

// 1) Signature du token
const signToken = (id) => {
  /*
  1A] Création de la signature du token avec le secret (set dans config.env) 
  1B) Création d'une date d'expiration (set dans config.env)
  */
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// 2) Créer un token prêt à l'envoie
const createSendToken = (user, statusCode, res) => {
  /*
  2A) Création et envoie du token pour l'utilisateur avec une date d'expiration 
  2B) Stockage du token dans les cookies (stockage sur le navigateur)
  */
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // 2C) Enlève le mot de passe de l'output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// 3) Inscription d'un utilisateur et envoie du token
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

// 4) Connexion de l'utlisateur et envoie du token
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 4A) vérifie si l'email et le mot de passe existe
  if (!email || !password) {
    return next(
      new AppError(`Nous un avons besoin d'un email et d'un mot de passe`, 400)
    );
  }
  // 4B) Vérifie si l'utilisateur et le mot de passe sont correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(`Email ou mot de passe invalide`, 401));
  }

  // 4C) Si tout est vérifié, envoie du token
  createSendToken(user, 200, res);
});

// 5) Protection pour voir si l'utilisateur est toujours connecté
exports.protect = catchAsync(async (req, res, next) => {
  // 5A) Récupération du token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(
        `Tu n'es pas connecté, connecte toi pour accèder à la page`,
        401
      )
    );
  }

  // 5B) Verification du token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 5C) Vérifie si l'utilisateur existe toujours
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(`L'utilisateur corrrespondant à ce token n'existe plus`, 401)
    );
  }

  // 5D) Vérifie si l'utilisateur à changer son mot de passe après la création du token
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        `L'utilisateur à recemment changer de mot de passe, s'il vous plait reconnectez vous!`,
        401
      )
    );
  }

  // Accès aux routes protéger
  req.user = currentUser;
  next();
});
// 6) Restriction pour un rôle définit
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Les rôles possible ['admin', 'user'] /!\
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `Vous n'avez pas la permissions de faire cette action`,
          403
        )
      );
    }

    next();
  };
};

// 7) Mot de passe oublié
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 7A) Récupère l'utilisateur via son email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError(`Il n'y pas d'utilisateur pour cette e-mail!`, 404)
    );
  }

  // 7B) Créer et réinitialise le token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 7C) Envoie du token sur l'email du l'utilisateur
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/pastfood/v1/users/resetPassword/${resetToken}`;

  const message = `Mot de passe oublié? Soumettez une nouvelle demande PATCH requête avec un nouveau mot de passe et le mot de passe confirmer ${resetURL}.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Votre mot de passe (token) réinitialiser (valide pour 10min)`,
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Le token a était envoyé par e-mail',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        `Il y a eu une erreur lors de l'envoie de l'email, réessayez!`
      ),
      500
    );
  }
});

// 8) Réinitialisation du mot de passe
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 8A) Récupérer l'utilisateur en fonction de son token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 8B) Si le token est toujours valide, que l'utilisateur existe, créer un nouveau mot de passe
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  // 8C) Mise à jour de "changedPasswordAt" pour l'utilisateur
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 8D) Log l'utilisateur et envoie le token
  createSendToken(user, 200, res);
});

// 9) Mise à jour du mot de passe
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 9A) Récupére l'utilisateur de la collection
  const user = await User.findById(req.user.id).select('+password');

  // 9B) Vérifie si le mot de passe de l'utilisateur est valide
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Votre mot de passe actuel est invalide.', 401));
  }

  // 9C) Si tout est correct met à jour le mot de passe
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate ne marche pas /!\

  // 9D) Log l'utilisateur et envoie le token
  createSendToken(user, 200, res);
});
