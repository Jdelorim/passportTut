const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcyrpt = require('bcryptjs');
const passport = require('passport');

router.get('/login', (req,res) => {
    res.render('login',{title: 'Login Page'});
});

router.get('/register', (req,res) => {
    res.render('Register',{title: 'Register Page'});
});

router.post('/register', (req,res) => {
    const {name, email, password, password2 } = req.body;
    let errors = [];

    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'please fill out all fields'});
    }
    if(password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }
    if(password.length < 6) {
        errors.push({msg: 'Password must be more then 6 characters'});
    }
    if(errors.length > 0) {
        res.render('register', {errors, name, email, password, password2});
    } else {
        User.findOne({email: email}).then(user =>{
            if(user) {
                errors.push({msg: 'email is already registered please login'})
                res.render('register', {errors, name, email, password, password2});
            } else {
                const newUser = new User({
                    name, email, password
                });
                //hash pw
                bcyrpt.genSalt(10,(err, salt) => bcyrpt.hash(newUser.password,salt,(err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'you are now registered')
                            res.redirect('/users/login');
                        })
                        .catch(err => {
                            console.log(err);
                        });

                }))
            }
        });
    }

});

router.post('/login', (req, res, next) =>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout',(req,res) => {
    req.logout();
    req.flash('success_msg', 'you are logged out');
    res.redirect('/users/login');

})

module.exports = router;