const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Review = require('../../models/Reviews');
const User = require('../../models/User');
const PizzaPlace = require('../../models/PizzaPlace');

const validateReviewInput = require('../../validation/review')

router.get('/PizzaPlace/:PizzaPlace_id', (req,res)=>{
    Review.find({PizzaPlace: req.params.PizzaPlace_id})
        .sort({date: -1})
        .then(reviews => {
            return res.json(reviews)})
        .catch(err => 
            res.status(404).json({PizzaPlaceNotFound: 'No PizzaPlace found with that ID'}
            )
        );
        
});

router.get('/user/:user_id', (req,res)=>{
    Review.find({user: req.params.user_id})
        .sort({date: -1})
        .then(reviews => res.json(reviews))
        .catch(err => 
            res.status(404).json({reviewNotFound: 'No review found for that user.'}
        )
    );
});

router.get('/:reviewId', (req,res)=>{
    Review.findById(req.params.reviewId)
        .then(review => res.json(review))
        .catch(err=>
            res.status(404).json({noReviewFound: 'No review found'}
        )
    );
});

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    (req,res)=> {
        const {errors, isValid} = validateReviewInput(req.body);

        if (!isValid){
            return res.status(400).json(errors);
        }
         
        const newReview = new Review({
            author: req.body.user.id,
            pizzaPlace: req.body.pizzaPlace,
            title: req.body.title, 
            body: req.body.body,
            cheese: req.body.cheese,
            sauce: req.body.sauce,
            crust: req.body.crust,
            price: req.body.price
        });
        
        newReview.save().then(review => res.json(review), errors => res.json('Could not create Review') 
        );
    });

    router.patch('/:reviewId', passport.authenticate('jwt', {session:false}), (req,res)=>{
        
        Review.findById(req.params.reviewId, function(err, review){
            if(!review){
                return res.status(400).json('We could not find that review');
            }else if (review.author != req.user.id){
                return res.status(400).json('Wrong User');
            }else{
                Review.findOneAndUpdate({ _id: req.params.reviewId}, req.body, function(err, review){
                    if(err){
                        return res.status(400).json(err);
                    }else{
                        newReview = req.body;
                        res.send(newReview);
                    }

                });
            }
        });
    });

    router.delete('/:reviewId', passport.authenticate('jwt', {session:false}), (req, res)=>{
        Review.findById(req.params.reviewId, function(err, review){
            if (!review){
                return res.status(400).json('We could not find that review');
            }else if (review.author != req.user.id){
                return res.status(400).json('Invalid Credentials');
            }else {
                Review.findOneAndDelete({_id: req.params.reviewId}, function (err,review){
                    if (err){
                        return res.status(400).json(err);
                    }else{
                        res.send(review.id);
                    }
                });
            }
        });
    });

    module.exports = router;