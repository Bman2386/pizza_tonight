const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PizzaPlaceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    avgReview: {
        type: Object
    }
    },
    {
        timestamps: true
});

module.exports = PizzaPlace = mongoose.model('PizzaPlace', PizzaPlaceSchema);