const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: { type: String, minlength: 4, required: true },
    password: { type: String, minlength: 6, required: true }
});

module.exports = mongoose.model('User', userSchema);