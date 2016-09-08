var mongoose = require('mongoose');

var PieceSchema = new mongoose.Schema({

    fileName: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

mongoose.model('Piece', PieceSchema);
