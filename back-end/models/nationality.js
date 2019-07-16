const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const nationalitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

let Model = mongoose.model('Nationality', nationalitySchema);

Model.createIndexes();

module.exports = Model;