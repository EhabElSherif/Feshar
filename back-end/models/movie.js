const mongoose = require('mongoose');
const validator = require('validator');
mongoose.set('useFindAndModify', false);

validator.isDate = (value) => !isNaN(new Date(value).getDate());

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    directors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }],
    producers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producer'
    }],
    parts: [{
        name: String,
        image_url: String,
        date: {
            type: String,
            required: true,
            validate: {
                validator: (value) => {
                    return validator.isDate(value);
                },
                message: "{VALUE} is not a valid date!"
            }
        },
        part_number: {
            type: Number,
            required: true,
            default: 1,
            validate: {
                validator: (value) => {
                    return validator.isInt(value, {
                        min: 0
                    });
                },
                message: "{VALUE} is not a valid season number!"
            }
        }
    }],
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
    cast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }],
    reviews: [{
        body: String,
        rate: {
            type: Number,
            required: true,
            default: NaN,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
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
    
    }],
    description: String
});

movieSchema.index({
    name: 1,
    part: 1,
    'part.date': 1
}, {
    unique: true
});

let Model = mongoose.model('Movie', movieSchema);

Model.createIndexes();

module.exports = Model;