const mongoose = require('mongoose');
const validator = require('validator');
mongoose.set('useFindAndModify', false);

validator.isDate = (value) => !isNaN(new Date(value).getDate());

const producerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    image_url: String,
    birth_date: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return validator.isDate(value);
            },
            message: "{VALUE} is not a valid date!"
        }
    },
    created_at: {
        type: String,
        required: true,
        default: new Date(),
        validate: {
            validator: (value) => {
                return validator.isDate(value);
            },
            message: "{VALUE} is not a valid date!"
        }
    },
    nationality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nationality',
        required: true
    },
    description: String
});

producerSchema.index({
    name: 1,
    birth_date: 1
}, {
    unique: true
});

let Model = mongoose.model('Producer', producerSchema);

Model.createIndexes();

module.exports = Model;