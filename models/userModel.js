const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Il nous faut un pseudo!'],
  },
  email: {
    type: String,
    required: [true, 'Il nous faut un e-mail'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Il nous faut un e-mail valide'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Il nous faut un mot de passe'],
    minlength: 8,
    // n'est plus affiché lors de la recherche
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, `Veuillez confirmer le mot de passe`],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: `Le mot de passe n'est pas le même!`,
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    // n'est plus affiché lors de la recherche
    select: false,
  },
});

// ______ Middleware ______

// 1) Pre-document middleware: Encrypte le mot de passe à chaque fois qu'il est modifié
userSchema.pre('save', async function (next) {
  // this.isModified est une methode mongoose qui vérifie si un champs a était modifié /!\
  if (!this.isModified('password')) return next();

  // Hash le mot de passe avec un coût de 12 pour le CPU
  this.password = await bcrypt.hash(this.password, 12);

  // Suprimme le champ "passwordConfirm"
  this.passwordConfirm = undefined;
  next();
});
// 2) Pre-document middleware: Enregistre la date de changement de mot de passe
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
// 3) Pre-document middleware: Permet de cacher l'utilisateur quand celui-ci à supprimer son compte (toujours présent dans DB)
userSchema.pre(/^find/, function (next) {
  // this.keyword pointe vers la Query
  this.find({ active: { $ne: false } });
  next();
});

// ______ Methods ______
// 1) Compare les mots de passe
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// 2) Vérifie si l'utilisateur à changer son mot de passe (pour le authController.protect)
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False = non changer
  return false;
};

// 3) Créer un token pour la réinitialisation du mot de passe avec une expiration de 10min
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
