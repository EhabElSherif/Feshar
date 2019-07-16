const Movie = require("../models/movie");

const typeDefs = `
    extend type Query {
        movies(
            name: String
            genres: [InputGenre]
            directors: [InputPerson]
            producers: [InputProducer]
            part: InputPart
            created_at: String
            cast: [InputPerson]
            reviews: [InputReview]
            description: String
        ): [Movie],

        movie(
            name: String
            genres: [InputGenre]
            directors: [InputPerson]
            producers: [InputProducer]
            part: InputPart
            created_at: String
            cast: [InputPerson]
            reviews: [InputReview]
            description: String
        ): Movie
    }

    extend type Mutation {
        addMovie(
            name: String
            genres: [InputGenre]
            # directors: [InputPerson]
            # producers: [InputProducer]
            # part: InputPart
            # created_at: String
            # cast: [InputPerson]
            # reviews: [InputReview]
            # description: String
        ): Movie,

        editMovie(
            select: InputMovie,
            
            name: String
            genres: [InputGenre]
            directors: [InputPerson]
            producers: [InputProducer]
            part: InputPart
            created_at: String
            cast: [InputPerson]
            reviews: [InputReview]
            description: String
        ): Movie,

        deleteMovie(
            name: String
            genres: [InputGenre]
            directors: [InputPerson]
            producers: [InputProducer]
            part: InputPart
            created_at: String
            cast: [InputPerson]
            reviews: [InputReview]
            description: String
        ): Movie,
    }
`;

const resolvers = {
  Query: {
    movies: (_, args) => {
        args.name = new RegExp(args.name, 'i');
        return Movie.find({name: new RegExp(args.name, 'i')}).populate('genres')
    },
    movie: (_, args) => Movie.findOne({name: args.name}).populate('genres')
  },

  Mutation: {
    addMovie: (_, args) => {
        const Genre = require('../models/genre');
        return new Promise((resolve, reject) => {
            if (args.genres) {
                let genres = [];
                args.genres.forEach((genre, index) => {
                    Genre.findOne(genre).then((genre) => {
                        if (genre) {
                            genres.push(genre._id);
                        }
                        if (index == args.genres.length - 1) {
                            args.genres = genres;
                            let NewMovie = new Movie(args); 
                            NewMovie.save().then((movie) => {
                                Movie.findById(movie._id).populate('genres').then((movie) => {
                                    resolve(movie);
                                });
                            }).catch((err) => {
                                reject(err)
                            });
                        }
                    });
                });
            }
        });
    },
    editMovie: (_, args) => {
        let MovieObject = Movie.findOneAndUpdate({name: args.name}, {name: args.new_name}, {new: true});
        return MovieObject.exec();
    },
    deleteMovie: (_, args) => {
        return Movie.findOneAndRemove({name: args.name}).exec();
    }
  }
};

module.exports = {
  MovieSchema: typeDefs,
  MovieResolvers: resolvers
};
