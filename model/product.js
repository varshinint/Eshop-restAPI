const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    brand: {
        type: String,
        default: ''
    },
    price : {
        type: Number,
        default:0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})



exports.Product =  mongoose.model('products', productSchema);

/* 
 {
 "name": "frying pan",
"description": " non stick pan. guranttee for 3 yrs",
"richDescription": "",
"image": "some url",
"brand": "preethi",
"price":  550,
"category": "665bd521a1522d3fd52de44d",
"countInStock": 15,
"rating": 5,
"numReviews": 2,
"isFeatured" : true
}
*/