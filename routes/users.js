const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const passportConfig = require('../config/passport');
const async = require('async');

/* GET users listing. */
router.get('/register', function (req, res) {
    res.render('admin_signup');
});

router.get('/login', function (req, res) {
    res.render('admin_login');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.post('/signup', function(req, res, next) {
    console.log(req.body);
    async.waterfall([
        function(callback) {
            let user = new User();

            user.fullname = req.body.fullname;
            user.email = req.body.email;
            user.username = req.body.username;
            user.password = req.body.password;
            user.phone = req.body.phone;

            User.findOne({ username: req.body.username }, function(err, existingUser) {
                if(existingUser) {
                    req.flash('errors', 'Account with that email already exists')
                    res.redirect('/users/signup');
                } else {
                    user.save(function (err, user) {
                        if (err) return next(err);
                        callback(null, user)
                    })
                }
            })
        },
        function (user) {
            req.logIn(user, function (err) {
                if (err) return next(err);
                res.redirect('/');
            })
        }
    ])
});

router.get('/logout', function(req, res, next) {
    console.log('You are logging out');
    req.logout();
    res.redirect('/');
});

module.exports = router;
