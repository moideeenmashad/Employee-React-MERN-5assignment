const jwt = require('jsonwebtoken')
const Emp = require('../models/employee')

const checkToken = (token) => {
    token = token.split(" ")
    console.log({ token })
    if (token&&token!==null&&token!=='') {
     
        const decode = jwt.verify(token[1], process.env.JWT_SECRET);

        return ({
            login: true,
            data: decode
        });

    } else {
        return ({
            login: false,
            data: 'error'
        });
    }
}
exports.empList = async (req, res) => {

    const decodedToken = checkToken(req.headers.authorization)

    if (decodedToken.login) {
        const employee = await Emp.find()
        return res.json({
            success: true,
            message: 'fetch success',
            data: employee
        })

    } else {
        return res.json({
            success: false,
            message: 'no valid token',
        })
    }
}

exports.getEmp = async (req, res) => {
    const decodedToken = checkToken(req.headers.authorization)

    if (decodedToken.login) {
        const employee = await Emp.findOne({ _id: req.params.id })
        console.log({ employee })

        return res.json({
            success: true,
            message: 'fetch success',
            data: employee
        })
    } else {
        return res.json({
            success: false,
            message: 'no valid token',
            data: {}
        })
    }
}

exports.createEmp = async (req, res) => {
    const decodedToken = checkToken(req.headers.authorization)

    if (decodedToken.login) {
        console.log({ req })
        const token = req.auth
        const employee = await Emp.create(req.body)

        console.log({ employee })

        return res.json({
            success: true,
            message: 'create success',
            data: employee
        })
    } else {
        return res.json({
            success: false,
            message: 'no valid token',
            data: {}
        })
    }
}
exports.updateEmp = async (req, res) => {
    console.log({ req })
    const decodedToken = checkToken(req.headers.authorization)

    if (decodedToken.login) {
        await Emp.findByIdAndUpdate(req.body._id, req.body)
        return res.json({
            success: true,
            message: 'update success',
        })
    } else {
        return res.json({
            success: false,
            message: 'no valid token',
            data: {}
        })
    }
}

exports.deleteEmp = async (req, res) => {

    console.log({ req })
    const decodedToken = checkToken(req.headers.authorization)

    if (decodedToken.login) {
        await Emp.deleteOne({ _id: req.body._id })

        return res.json({
            success: true,
            message: 'delete success',
        })
    } else {
        return res.json({
            success: false,
            message: 'no valid token',
            data: {}
        })
    }
}