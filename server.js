const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// Connexion au serveur //
// Toutes les données sont stockées dans le fichier config.env
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Différente option set to true, pour supporter les différentes mise à jour de mongo ( deprecated)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à la base de donnée réussie!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`L'application fonctionne sur le port:${port}...`);
});
