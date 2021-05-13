const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePizzaPlaceInput(data){
    let errors = {};
    data.name = validText(data.name) ? data.name : '';
    data.address = validText(data.address) ? data.address : '';
    data.phone = validText(data.phone) ? data.phone : '';
    
    if (Validator.isEmpty(data.name)){
        errors.text = 'Pizza Place needs a name!';
    }

    if (Validator.isEmpty(data.address)){
        errors.text = 'Pizza Place needs an address!';
    }
    
    if (Validator.isEmpty(data.phone)){
        errors.text = 'Pizza Place needs a phone #!';
    }

    if (!Validator.isNumeric(data.phone)){
        errors.text = 'Phone needs to be a numeric value';
    }

    return{
        errors, 
        isValid: Object.keys(errors).length === 0
    };
};