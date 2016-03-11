var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    spotifyId: Number
});

module.exports = mongoose.model("User", userSchema);