const sg = require("@sendgrid/mail");

const { SENDGRID_API_KEY, MAILING_ADDRESS } = process.env;

sg.setApiKey(SENDGRID_API_KEY);

const sentVerifyURL = async (email, verifyURL) => {
  const msg = {
    to: email,
    from: MAILING_ADDRESS,
    subject: "Please Verify Your Email",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      verifyURL +
      ">Click here to verify</a>",
  };

  await sg.send(msg);
};

module.exports = { sentVerifyURL };
