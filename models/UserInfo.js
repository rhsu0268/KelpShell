var mongoose = require('mongoose');

var UserInfoSchema = new mongoose.Schema({
    name: String,
    musicBackground: String,
    favoriteGenre: String,
    favoritePiece: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}


});

mongoose.model('UserInfo', UserInfoSchema);
