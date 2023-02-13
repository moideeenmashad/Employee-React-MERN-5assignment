const { check, validationResult } = require('express-validator')


exports.validateUserSignUp = [
    check('fullName').trim()
        .not().isEmpty().withMessage('Name is required')
        .isString().withMessage('invalid name')
        .isLength({ min: 3, max: 20 }).withMessage('Name must be within 3 to 20 character!'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email!'),
    check('password').trim().not().isEmpty().isLength({ min: 6, max: 20 }).
        withMessage('Password must be within 6 to 20 character!')
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if (!result.length) return next()
    const error = result[0].msg;
    res.json({ success: false, message: error })
}

exports.validateUserSignIn = [
    check('email').normalizeEmail().isEmail()
        .isEmpty().withMessage('email cannot be null'),
    check('password').trim().not()
        .isEmpty().withMessage('password cannot be null')
        .isLength({ min: 6, max: 20 }).
        withMessage('Password must be within 6 to 20 character!')
]