const mongoose = require('mongoose')


const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
      location: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
})



module.exports = mongoose.model('Emp', empSchema)
