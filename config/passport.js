const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// serialize and deserialize
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});

//middleware
passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    User.findOne({username: username}, function (err, user) {
        if (err) return done(err);
        if (!user) {
            return done(null, false, req.flash('loginMessage', 'No user has been found'));
        }
        if (!user.comparePassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Wrong password, please try again'));
        }
        return done(null, user)
    })
}));

//custom function to validate
exports.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
