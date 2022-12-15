const express = require('express');
const { create, verifyEmail, resendEmailVerificationToken, forgotPassword, sendResetPasswordTokenStatus, resetPassword, signIn } = require('../controllers/user');
const { isValidPassResetToken } = require('../middleware/user');
const { userValidator ,validate, validatePassword,signInValidator} = require('../middleware/validator');


const router = express.Router();

router.post('/create',userValidator,validate, create);
router.post('/sign-in',signInValidator,validate, signIn);
router.post('/verify-email',verifyEmail);
router.post('/resend-email-verification-token',resendEmailVerificationToken);
router.post('/forget-password',forgotPassword);
router.post('/verify-pass-reset-token', isValidPassResetToken, sendResetPasswordTokenStatus);
router.post('/reset-password', validatePassword, validate, isValidPassResetToken, resetPassword);

module.exports = router;