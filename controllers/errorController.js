const AppError = require('./../utils/appError');

// _____ Les différents message possible pour la production! ______

// 1) Message personnalisé: les erreurs de la base de donnée
const CastErrorDB = (err) => {
  const message = `Invalide ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// 2) Message personnalisé: les erreurs des champs dupliqués censé être unique (titleRecipe)
const DuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Le champs dupliqué est: ${value}. S'il vous plait entrez une autre valeur!`;
  return new AppError(message, 400);
};

// 3) Message personnalisé: les erreurs liées à la validation des Schema Mongoose
const ValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Les données sont invalides. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// 4) Message personnalisé: les erreurs pour les tokens invalide
const JWTError = () =>
  new AppError(`Le token est invalide. S'il vous plait reconnectez-vous!`, 401);

// 5) Message personnalisé: les erreurs pour les tokens expirés
const JWTExpiredError = () =>
  new AppError(`Le token a expiré. S'il vous plait reconnectez-vous!`, 401);

// 6) Message personnalisé: envoie un message complet pour la partie développeurs
const ErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// 7) Message personnalisé: envoie un message partiel pour la partie production
const ErrorProd = (err, res) => {
  // 7A) Les erreurs qui sont de confiance
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // 7B) Les erreurs inconnu: aucun détails concernant l'erreur
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Quelque(s) chose(s) ne fonctionne pas!',
    });
  }
};

// 8) Redirige les messages d'erreurs
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    ErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = CastErrorDB(error);
    if (error.code === 11000) error = DuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = ValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = JWTError();
    if (error.name === 'TokenExpiredError') error = JWTExpiredError();

    ErrorProd(error, res);
  }
};
