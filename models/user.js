const mongoose = require('mongoose');

const User = mongoose.model('user', {
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        minLength: [5, 'Name is too short!'],
        maxLength: 15
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minLength: [6, 'Password is too short!'],
        maxLength: 70,
        required: true,
        trim: true
    }
    // roles: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Role"
    //   }
    // ]
})

module.exports = { User }