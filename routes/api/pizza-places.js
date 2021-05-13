const express = require('express');
const pizzaPlacesRouter = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const PizzaPlace = require('../../models/PizzaPlace');
const validatePizzaPlaceInput = require('../../validation/pizza-place');

pizzaPlacesRouter.get('/', (req,res)=>{
    PizzaPlace.find()
        .sort({date:-1})
        .then(pizzaPlace => res.json(pizzaPlace))
        .catch(err => res.status(404).json({nopizzaPlacefound: 'No Pizza Place found, create one!'}));

});


pizzaPlacesRouter.get('/:pizzaPlaceId', (req,res)=> {
    PizzaPlace.findById(req.params.pizzaPlaceId)
        .then(pizzaPlace => res.json(pizzaPlace))
        .catch(err => 
            res.status(404).json({nopizzaPlacefound: 'No Pizza Place found with that id'})
            );
});

pizzaPlacesRouter.post('/', 
    passport.authenticate('jwt', {session:false}),
    (req,res)=>{
        const{errors, isValid} = validatePizzaPlaceInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newPizzaPlace = new PizzaPlace({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            avgReview: req.body.avgReview
        });

        newPizzaPlace.save().then(pizzaPlace => res.json(pizzaPlace), errors=>res.json(errors));
    });

pizzaPlacesRouter.patch('/:pizzaPlaceId', passport.authenticate('jwt', {session:false}), (req,res)=>{
    PizzaPlace.findById(req.params.pizzaPlaceId, function(err, pizzaPlace){
        if (!pizzaPlace){
            return res.status(400).json('We could not find that Pizza Place');
        }else{
            PizzaPlace.findOneAndUpdate({_id: req.params.pizzaPlaceId}, req.body, function(err, pizzaPlace){
                if (err) {
                    return res.status(400).json(err);
                }else {
                    const newPizzaPlace = new PizzaPlace({
                        name: req.body.name,
                        address: req.body.address,
                        phone: req.body.phone,
                        avgReview: req.body.avgReview
                    });
            
                    newPizzaPlace.save().then(pizzaPlace => res.json(pizzaPlace), errors=>res.json(errors));
                }
            });
        }
    });
});

pizzaPlacesRouter.delete('/:pizzaPlaceId', passport.authenticate('jwt', {session:false}), (req,res)=>{
   PizzaPlace.findById(req.params.pizzaPlaceId, function(err, pizzaPlace){
       if(!pizzaPlace){
           return res.status(400).json('We could not find that Pizza Place');
       } else{
           PizzaPlace.findOneAndDelete({_id: req.params.pizzaPlaceId}, function (err, pizzaPlace){
               if (err){
                   return res.status(400).json(err);
               }else{
                   res.send(pizzaPlace.id);
               }

           });
       }
   });
});

module.exports = pizzaPlacesRouter;