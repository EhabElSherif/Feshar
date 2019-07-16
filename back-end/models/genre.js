const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

let Model = mongoose.model('Genre', genreSchema);

Model.createIndexes();

module.exports = Model;