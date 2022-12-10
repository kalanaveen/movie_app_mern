const express = require('express');
const { create, verifyEmail, resendEmailVerificationToken, forgotPassword } = require('../controllers/user');
const { isValidPassResetToken } = require('../middleware/user');
const { userValidator ,validate} = require('../middleware/validator');


const router = express.Router();

router.post('/create',userValidator,validate, create);
router.post('/verify-email',verifyEmail);
router.post('/resend-email-verification-token',resendEmailVerificationToken);
router.post('/forget-password',forgotPassword);
router.post('/verify-pass-reset-token', isValidPassResetToken, (req, res) => {
    res.json({ valid: true });
});

module.exports = router;