const mongoose = require('mongoose')


const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    zip :{
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }

})



exports.User =  mongoose.model('user', userSchema);

/*
{
        "name": "Leela",
        "email": "abc@gmail.com",
        "passwordHash": "127856",
        "phone": "98495446545",
        "isAdmin": false,
        "street": "macreena",
        "apartment" : "xyx",
        "zip": 64565,
        "city": "Kerala",
        "country": "India"
} */