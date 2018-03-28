const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    fullname: String,
    username: {type: String, unique: true},
    password: String,
    email: String,
    phone: String,
});

UserSchema.pre('save', function(next) {
    let user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);