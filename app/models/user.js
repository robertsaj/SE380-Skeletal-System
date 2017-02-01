var bcrypt = require('bcrypt-node');

var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
   local: {
       email: String,
       password: String
   }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);