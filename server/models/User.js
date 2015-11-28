var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 13;

var User = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  surname: { type: String, required: true },
  firstname: { type: String, required: true },
  token: String
});

/**
 * Middleware, který automaticky hashuje heslo při uložení
 * http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
 * !!!!!!Mongoose middleware is not invoked on update() operations, so you must use a save() if you want to update user passwords.
 */
User.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/**
 * Porovná, zda dané heslo souhlasí se zahashovaným heslem v DB 
 * @param {String} candidatePassword heslo, které chceme porovnat (nezahashované)
 * @param {function} callback
 */
User.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', User);


