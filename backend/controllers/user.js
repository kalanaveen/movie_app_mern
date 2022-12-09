const EmailVerificationToken = require('../models/emailVerificationToken');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { isValidObjectId } = require('mongoose');

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });

  if (oldUser)
    return res.status(401).json({ error: 'This email is already taken' });

  const newUser = new User({ name, email, password });
  await newUser.save();

  // generate a otp
  let otp = '';
  for (let i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    otp += randomVal;
  }

  // store otp inside our db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: otp,
  });

  await newEmailVerificationToken.save();

  // send otp to user
  let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'ad33388dbccbec',
      pass: 'c9d93d38d61d34',
    },
  });

  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: newUser.email,
    subject: 'Email Verification',
    html: `
         <p>Your verification OTP</p>
         <h1>${otp}</h1>
        `,
  });
  res
    .status(201)
    .json({
      message: 'Please verify your email,OTP has been sent to you email',
    });
};

exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!isValidObjectId(userId))
    return res.status(401).json({ error: 'Invalid User' });

  const user = await User.findById(userId);
  if (!user) return res.status(401).json({ error: 'user not found!' });

  if (user.isVerfified) return res.json({ error: 'User is already verfied!' });

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return res.json({ error: 'token not found' });
};
