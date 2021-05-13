const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName, 
        
    });
  })

router.get('/', (req,res)=>{
    User.find()
        .sort({id:-1})
        .then(users => {
            const payload = users.map(user => {
                return {
                    id: user.id, 
                    email: user.email, 
                    firstName: user.firstName, 
                    lastName: user.lastName}
            })
            res.json(payload)})
        .catch(err => res.status(404).json({noUsersFound: 'No Users found!'}));
});


router.get('/:id', (req, res)=> {
    User.findById(req.params.id)
        .then(user => {
            const payload = {
                id: user.id, 
                    email: user.email, 
                    firstName: user.firstName, 
                    lastName: user.lastName}
            res.json(payload)})
        .catch(err => 
            res.status(404).json({noUserFound: 'No User Found with that ID'})
            );
});

router.post('/register', (req,res)=> {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
      }

    User.findOne({email: req.body.email})
        .then(user=>{
            if (user){
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            }else{
                const newUser = new User({
                    email: req.body.email,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                })
            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            const payload = {
                                id: user.id, 
                                email: user.email, 
                                firstName: user.firstName, 
                                lastName: user.lastName}
                            res.json(payload)})
                        .catch(err=> console.log(err))
                })
            })
        }
    })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({email})
      .then(user => {
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }
  
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                const payload = {id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName};

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 3600},
                    (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                    });
                } else {
                return res.status(400).json({password: 'Incorrect password'});
                }
            })
      })
  })

  router.patch('/:userId', passport.authenticate('jwt', {session:false}), (req,res)=>{
        
    User.findById(req.params.userId, function(err, user){
        if(!user){
            return res.status(400).json('We could not find that user');
        }else if (user.id != req.user.id){
            return res.status(400).json('Wrong User');
        }else{
            User.findOneAndUpdate({ _id: req.params.userId}, req.body, function(err, user){
                if(err){
                    return res.status(400).json(err);
                }else{
                    updatedUser = req.body;
                    res.send(updatedUser);
                }

            });
        }
    });
});

module.exports = router;