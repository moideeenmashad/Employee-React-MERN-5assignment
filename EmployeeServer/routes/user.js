const express = require('express');
const { createUser, signInUser } = require('../controllers/user.signup');
const { check } = require('express-validator');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validations/user');
const { isAuth } = require('../middlewares/auth');
const { createEmp, empList, updateEmp, deleteEmp, getEmp } = require('../controllers/emp.list');

const router = express.Router()

router.post("/create-user", validateUserSignUp, userValidation, createUser)
router.post("/sign-in", validateUserSignIn, signInUser)

router.get("/emp-list", empList)
router.get("/emp/:id", getEmp)

router.post("/create-emp", createEmp)
router.put("/update-emp", updateEmp)
router.post("/delete-emp", deleteEmp)
module.exports = router;
