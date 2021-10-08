const mongoose = require('mongoose');

// Local db
// mongodb://localhost:27017/test

// const Schema = mongoose.Schema;
const  Student = mongoose.model('student', {
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,   //Remove white spaces from both sides of a string
        minLength: [4, 'Name is too short!'],
        maxLength: 15
    },
    ssn: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true,
        uppercase: true
    },
    mobile: {
        type: String,
        required: [true, 'What is your contact number?']
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'complete', 'pastdue'],
        default: 'complete'
    }
})

module.exports = { Student }