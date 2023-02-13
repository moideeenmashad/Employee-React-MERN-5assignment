const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:String,
    avatar: Buffer
})

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err)
            this.password = hash;
            next()
        })
    }
})
userSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('Password is missing')
    try {
        const result = await bcrypt.compare(password, this.password)
        return result;
    } catch (error) {
        console.log('Error while comparing password!', error.message)
    }
}

userSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Invalid Email')
    try {
        const user = await this.findOne({ email })
        console.log({ user })
        if (user) return true
        return false
    } catch (error) {
        return false
    }
}

module.exports = mongoose.model('User', userSchema)
