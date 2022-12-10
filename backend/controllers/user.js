const EmailVerificationToken = require('../models/emailVerificationToken');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { isValidObjectId } = require('mongoose');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendError } = require('../utils/helper');

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });

  if (oldUser) return sendError(res, 'This email is already taken');

  const newUser = new User({ name, email, password });
  await newUser.save();

  let otp = generateOTP();

  // store otp inside our db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: otp,
  });

  await newEmailVerificationToken.save();

  // send otp to user
  let transport = generateMailTransporter();

  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: newUser.email,
    subject: 'Email Verification',
    html: `
         <p>Your verification OTP</p>
         <h1>${otp}</h1>
        `,
  });
  res.status(201).json({
    message: 'Please verify your email,OTP has been sent to you email',
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!isValidObjectId(userId)) return sendError(res, 'Invalid User');

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'user not found!', 404);
  if (user.isVerfified) return sendError(res, 'User is already verfied!');

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return sendError(res, 'token not found');

  // method created for comapre token
  const isMatched = await token.compareToken(otp);
  if (!isMatched) return sendError(res, 'Please submit valid otp');

  user.isVerfified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  let transport = generateMailTransporter();

  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: user.email,
    subject: 'Welcome Email',
    html: '<h1>Welcome to our app and thanks for choosing us.</h1>',
  });

  res.json({ message: 'your email is verified.' });
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.json({ error: 'user not found!' });

  if (user.isVerfified)
    return sendError(res, 'This email id is already verified');

  const alreadyHasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });

  if (alreadyHasToken)
    return sendError(
      res,
      'Only after one hour you can request for another token'
    );

  // generate a otp
  let otp = generateOTP();

  // store otp inside our db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: otp,
  });

  await newEmailVerificationToken.save();

  // send otp to user
  let transport = generateMailTransporter();

  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: user.email,
    subject: 'Email Verification',
    html: `
           <p>Your verification OTP</p>
           <h1>${otp}</h1>
          `,
  });
  res.json({ message: 'New otp has been sent to your registrered email' });
};
