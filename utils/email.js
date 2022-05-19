const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Créer un transporteur
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Option de l'email
  const mailOptions = {
    from: 'Axel ETO <gustaveturrell@icloud.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Envoie l'email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
