const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Recipe = require('../../models/recipeModel');
const Review = require('../../models/reviewModel');
const User = require('../../models/userModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à la base de donnée réussie!'));

// Fichier JSON
// const recipes = JSON.parse(
//   fs.readFileSync(`${__dirname}/recipe-all.json`, 'utf-8')
// );

// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// Importation des données
const importData = async () => {
  try {
    // await Recipe.create(recipes);
    // await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Les données ont été mis en ligne sur le base de donnée!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Supression des données

const deleteData = async () => {
  try {
    // await Recipe.deleteMany();
    // await User.deleteMany();
    await Review.deleteMany();
    console.log('Les données on été supprimer de la base de donnée');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
