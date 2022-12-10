const nodemailer = require('nodemailer');

exports.generateOTP = (otp_length = 6) => {
  // generate a otp
  let otp = '';
  for (let i = 0; i <= otp_length; i++) {
    const randomVal = Math.round(Math.random() * 9);
    otp += randomVal;
  }
  return generateOTP;
};

exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'ad33388dbccbec',
      pass: 'c9d93d38d61d34',
    },
  });
