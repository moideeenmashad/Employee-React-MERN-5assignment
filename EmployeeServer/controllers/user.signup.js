const User = require('../models/users')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    // req.body
    const isOldUser = await User.isThisEmailInUse(req.body.email)
    console.log({ isOldUser })
    if (isOldUser) {
        res.send({ status: 'user already exist, try sign in' })
        return
    }
    const user = await User(req.body)
    await user.save().then((us) => {
        console.log('saved')
        const token = jwt.sign({ userId: us._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.send({
            data: user,
            token,
            success: true,
            message: 'signup success',
        })
    }).catch((err) => {
        res.send({ message: err.message, status_code: '0' })
        console.log(err.message)
    })
}

exports.signInUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) return res.json({
        success: false,
        message: 'user not found'
    })
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.json({
        success: false,
        message: 'incorrect password',
    })
    console.log({user})
    const decodeData={
        userId: user._id,
        role: user.role||'USER'
    }
    console.log({decodeData})
    const token = jwt.sign(decodeData, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.json({
        success: true,
        message: 'sign-in success',
        user,
        token
    })
}

