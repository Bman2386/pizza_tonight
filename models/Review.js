const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    user:{
        type:Object
    },
    pizzaPlace:{
        type: Schema.Types.ObjectId,
        ref: 'pizzaPlace'
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    cheese: {
        type: Number,
        required: true
    },
    sauce: {
        type: Number,
        required: true
    },
    crust: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Review = mongoose.model('Review', ReviewSchema);