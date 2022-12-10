const express = require('express');
const { create, verifyEmail, resendEmailVerificationToken, forgotPassword } = require('../controllers/user');
const { userValidator ,validate} = require('../middleware/validator');


const router = express.Router();

router.post('/create',userValidator,validate, create);
router.post('/verify-email',verifyEmail);
router.post('/resend-email-verification-token',resendEmailVerificationToken);
router.post('/forget-password',forgotPassword);

module.exports = router;