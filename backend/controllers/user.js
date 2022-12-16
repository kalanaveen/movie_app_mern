const EmailVerificationToken = require('../models/emailVerificationToken');
const User = require('../models/user');
const { isValidObjectId } = require('mongoose');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendError, generateRandomByte } = require('../utils/helper');
const PasswordResetToken = require('../models/passwordResetTokenSchema');
const jwt = require('jsonwebtoken');

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
  if (user.isVerified) return sendError(res, 'User is already verfied!');

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return sendError(res, 'token not found');

  // method created for comapre token
  const isMatched = await token.compareToken(otp);
  if (!isMatched) return sendError(res, 'Please submit valid otp');

  user.isVerified = true;
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
  if (!user) return sendError(res, 'user not found!');

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

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, 'email is missing');

  const user = await User.findOne({ email });
  if (!user) return sendError(res, 'user not found', 404);

  const alreadyToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyToken)
    return sendError(
      res,
      'Only after one hour you can request for another token'
    );

  const token = await generateRandomByte();
  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });

  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

  let transport = generateMailTransporter();

  transport.sendMail({
    from: 'security@reviewapp.com',
    to: user.email,
    subject: 'Reset Password Link',
    html: `
           <p>Click here to reset password</p>
           <a href='${resetPasswordUrl}'>Change Password</a>
          `,
  });
  res.json({ msg: 'Link sent to your email' });
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);

  if (matched)
    return sendError(res, 'The new password must be different from old one!');

  user.password = newPassword;
  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  let transport = generateMailTransporter();

  transport.sendMail({
    from: 'security@reviewapp.com',
    to: user.email,
    subject: 'Password reset successfully',
    html: `
           <h1>Password reset successfully</h1>
           <p>Now you can use new password</p>
          `,
  });
  res.json({
    message: 'Password reset successfully,Now you can use new password',
  });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, 'Email/Password mismatch!');

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, 'Email/Password mismatch!');

  const { _id, name } = user;

  const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);
  res.json({ user: { id: _id, name, email, token: jwtToken } });
};
