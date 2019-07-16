const mongoose = require('mongoose');
const validator = require('validator');
mongoose.set('useFindAndModify', false);

validator.isDate = (value) => !isNaN(new Date(value).getDate());

const seriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    rate: {
        type: Number,
        default: NaN,
    },
    directors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }],
    producers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producer'
    }],
    season: [{
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
        season_number: {
            type: Number,
            default: 1,
            require: true,
            validate: {
                validator: (value) => {
                    return validator.isInt(value, {
                        min: 0
                    });
                },
                message: "{VALUE} is not a valid season number!"
            }
        },
        episodes: [{
            name: {
                type: String,
                require: true
            },
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
            episode_number: {
                type: Number,
                validate: {
                    validator: (value) => {
                        return validator.isInt(value, {
                            min: 0
                        });
                    },
                    message: "{VALUE} is not a valid episode number!"
                }
            }
        }]
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
    description: String
});

seriesSchema.index({
    name: 1,
    season: 1,
    'season.date': 1
}, {
    unique: true
});

let Model = mongoose.model('Series', seriesSchema);

Model.createIndexes();

module.exports = Model;