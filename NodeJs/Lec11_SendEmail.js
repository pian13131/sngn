// SendGrid
// npm i @sendgrid/mail
// send with API
const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = "akeyfromsendgrid";

sgMail.setApiKey(sendgridAPIKey);
sgMail.send({
  to: "jialun13131@hotmail.com",
  from: "halo213131@gmail.com",
  subject: "a subject",
  text: "body text"
});

// to call in another file
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    // it is asycn, return a promise
    to: email,
    from: "halo213131@gmail.com",
    subject: "Welcome!",
    text: `Hi ${name}, welcome!!!`,
    html: "<h1>Welcome!</h1>"
  });
};

module.exports = { sendWelcomeEmail };

// in another file

const { sendWelcomeEmail } = require("../emails/account");

sendWelcomeEmail(user.email, user.name);

// environment viraibles
// env-cmd js
// store env viraibles in dev.env file
// add 'env-cmd' into "scriptes"
// 'dev': "env-cmd ./comfig/dev.env nodemon src/index.js'

// so you can store all api, port, secret coed,  setting in config file

process.env.PORT;

// mongodb atlas
// cloud database
