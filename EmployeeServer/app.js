console.log('welcome')
const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose')
require('./models/db');
const User = require('./models/users')
const userRouter = require('./routes/user')
const cors = require('cors')
const PORT = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())
app.use(userRouter)





app.listen(PORT, () => {
    console.log('server listening')
})


app.get("/", (req, res) => {
    res.status(200).send({ message: 'success', status_code: '1' })
})
