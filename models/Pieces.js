var mongoose = require('mongoose');

var PieceSchema = new mongoose.Schema({

    fileName: String,
    sharing: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

mongoose.model('Piece', PieceSchema);
