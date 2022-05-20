const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const recipeRouter = require('./routes/recipeRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// Start express app
const app = express();

// bonojour

// Sécurise le HTTP Headers
app.use(helmet());

// Connexion en mode developpement
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limite le nombre de requête afin d'éviter que le serveur crash
// (une 1heure d'attente après 100 requête)
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Trop de requête veuillez reessayer dans 1 heure',
});

app.use('/pastfood', limiter);

// Limite la lecture des données présent de le req.boy à 100kb
app.use(
  express.json({
    limit: '10kb',
  })
);

// Désinfecte les données contre les injections de NoSQL query
app.use(mongoSanitize());

// Désinfecte les données contre XSS
app.use(xss());

// Permet l'utilisation des données static présent dans le dossier /public
app.use(express.static(`${__dirname}/public`));

// Les différentes routes:
app.use('/pastfood/v1/recipes', recipeRouter);
app.use('/pastfood/v1/users', userRouter);
app.use('/pastfood/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `N'arrive pas à trouver ${req.originalUrl} sur le serveur!`,
      400
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
