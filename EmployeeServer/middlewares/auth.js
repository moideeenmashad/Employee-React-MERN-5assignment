const Users = require("../models/users")
const jwt = require('jsonwebtoken')

exports.isAuth = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization) {
            console.log({ auth: req.headers.authorization })
            const token = req.headers.authorization.split(" ")?.[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            const user = await Users.findById(decode.userId);
            if (!user) res.json({ success: false, message: 'unauthorized access' })
            req.user = user
            next()
        } else {
            res.json({ success: false, message: 'unauthorized access' })
        }

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.json({ success: false, message: 'unauthorized access' })
        }
        if (error.name === 'TokenExpiredError') {
            return res.json({ success: false, message: 'session expired, try signing in!' })
        }
        return res.json({ success: false, message: 'Internal Server Error' })
    }
}