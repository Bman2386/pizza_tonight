const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateReviewInput(data){
    let errors = {};

    data.cheese = validText(data.cheese) ? data.cheese : '';
    data.sauce = validText(data.sauce) ? data.sauce : '';
    data.crust = validText(data.crust) ? data.crust : '';
    data.price = validText(data.price) ? data.price : '';

    if(Validator.isEmpty(data.cheese)){
        errors.text = 'Cheese needs a rating!'
    }

    if(Validator.isEmpty(data.sauce)){
        errors.text = 'Sauce needs a rating!'
    }

    if(Validator.isEmpty(data.crust)){
        errors.text = 'Crust needs a rating!'
    }

    if(Validator.isEmpty(data.price)){
        errors.text = 'Price needs a rating!'
    }

    return{
        errors,
        isValid: Object.keys(errors).length === 0
    }
}