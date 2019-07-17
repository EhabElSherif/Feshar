const Movie = require("../models/movie");
const Genre = require('../models/genre');
const Person = require('../models/person');
const Producer = require('../models/producer');

const typeDefs = `
    extend type Query {
        movies(
            name: String
            genres: [InputGenre]
            directors: [InputPerson]
            producers: [InputProducer]
            parts: [InputPart]
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
            parts: [InputPart]
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
            directors: [InputPerson]
            producers: [InputProducer]
            parts: [InputPart]
            created_at: String
            cast: [InputPerson]
            reviews: [InputReview]
            description: String
        ): Movie,

        editMovie(
            select: InputMovie
            pull: InputMovieArrays
            push: InputMovieArrays

            name: String
            created_at: String
            description: String
        ): Movie,

        deleteMovie(
            name: String
            genres: [InputGenre]
            directors: [InputPerson]
            producers: [InputProducer]
            parts: [InputPart]
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
        
        return new Promise((resolve, reject) => {
            
            // Name
            args.name = new RegExp(args.name, 'i');

            // Parts
            if (args.parts) {
                args.parts.name = new RegExp(args.parts.name, 'i');
            }

            let FixPromises = [];

            // Genres
            let GenresPromises = [];
            args.genres.forEach((genre) => {
                GenresPromises.push(Genre.findOne(genre));
            });
            FixPromises.push(Promise.all(GenresPromises).then((data) => {
                let GenresIDs = [];
                data.forEach((genre, index) => {
                    GenresIDs.push(genre._id);
                    if (index == data.length - 1) args.genres = GenresIDs;
                });
            }));
            
            // Directors
            let DirectorsPromises = [];
            args.directors.forEach((director) => {
                DirectorsPromises.push(Person.findOne(director));
            });
            FixPromises.push(Promise.all(DirectorsPromises).then((data) => {
                let DirectorsIDs = [];
                data.forEach((director, index) => {
                    DirectorsIDs.push(director._id);
                    if (index == data.length - 1) args.directors = DirectorsIDs;
                });
            }));
            
            // Producers
            let ProducersPromises = [];
            args.producers.forEach((producer) => {
                ProducersPromises.push(Producer.findOne(producer));
            });
            FixPromises.push(Promise.all(ProducersPromises).then((data) => {
                let ProducersIDs = [];
                data.forEach((producer, index) => {
                    ProducersIDs.push(producer._id);
                    if (index == data.length - 1) args.producers = ProducersIDs;
                });
            }));
            
            // Cast
            let CastPromises = [];
            args.directors.forEach((person) => {
                CastPromises.push(Person.findOne(person));
            });
            FixPromises.push(Promise.all(CastPromises).then((data) => {
                let CastIDs = [];
                data.forEach((person, index) => {
                    CastIDs.push(person._id);
                    if (index == data.length - 1) args.persons = CastIDs;
                });
            }));
        
            Promise.all(FixPromises).then(() => {
                Movie.find(args).populate('genres').populate('directors').populate('producers').populate('cast').then((movies) => {
                    resolve(movies);
                }).catch((err) => {
                    reject(err)
                });
            })

        });
    },
    movie: (_, args) => {
        
        return new Promise((resolve, reject) => {

            let FixPromises = [];

            // Genres
            let GenresPromises = [];
            args.genres.forEach((genre) => {
                GenresPromises.push(Genre.findOne(genre));
            });
            FixPromises.push(Promise.all(GenresPromises).then((data) => {
                let GenresIDs = [];
                data.forEach((genre, index) => {
                    GenresIDs.push(genre._id);
                    if (index == data.length - 1) args.genres = GenresIDs;
                });
            }));
            
            // Directors
            let DirectorsPromises = [];
            args.directors.forEach((director) => {
                DirectorsPromises.push(Person.findOne(director));
            });
            FixPromises.push(Promise.all(DirectorsPromises).then((data) => {
                let DirectorsIDs = [];
                data.forEach((director, index) => {
                    DirectorsIDs.push(director._id);
                    if (index == data.length - 1) args.directors = DirectorsIDs;
                });
            }));
            
            // Producers
            let ProducersPromises = [];
            args.producers.forEach((producer) => {
                ProducersPromises.push(Producer.findOne(producer));
            });
            FixPromises.push(Promise.all(ProducersPromises).then((data) => {
                let ProducersIDs = [];
                data.forEach((producer, index) => {
                    ProducersIDs.push(producer._id);
                    if (index == data.length - 1) args.producers = ProducersIDs;
                });
            }));
            
            // Cast
            let CastPromises = [];
            args.directors.forEach((person) => {
                CastPromises.push(Person.findOne(person));
            });
            FixPromises.push(Promise.all(CastPromises).then((data) => {
                let CastIDs = [];
                data.forEach((person, index) => {
                    CastIDs.push(person._id);
                    if (index == data.length - 1) args.persons = CastIDs;
                });
            }));
        
            Promise.all(FixPromises).then(() => {
                Movie.findOne(args).populate('genres').populate('directors').populate('producers').populate('cast').then((movie) => {
                    resolve(movie);
                }).catch((err) => {
                    reject(err)
                });
            })

        });
    }
  },

  Mutation: {
    addMovie: (_, args) => {
        
        return new Promise((resolve, reject) => {

            let FixPromises = [];

            // Genres
            let GenresPromises = [];
            args.genres.forEach((genre) => {
                GenresPromises.push(Genre.findOne(genre));
            });
            FixPromises.push(Promise.all(GenresPromises).then((data) => {
                let GenresIDs = [];
                data.forEach((genre, index) => {
                    GenresIDs.push(genre._id);
                    if (index == data.length - 1) args.genres = GenresIDs;
                });
            }));
            
            // Directors
            let DirectorsPromises = [];
            args.directors.forEach((director) => {
                DirectorsPromises.push(Person.findOne(director));
            });
            FixPromises.push(Promise.all(DirectorsPromises).then((data) => {
                let DirectorsIDs = [];
                data.forEach((director, index) => {
                    DirectorsIDs.push(director._id);
                    if (index == data.length - 1) args.directors = DirectorsIDs;
                });
            }));
            
            // Producers
            let ProducersPromises = [];
            args.producers.forEach((producer) => {
                ProducersPromises.push(Producer.findOne(producer));
            });
            FixPromises.push(Promise.all(ProducersPromises).then((data) => {
                let ProducersIDs = [];
                data.forEach((producer, index) => {
                    ProducersIDs.push(producer._id);
                    if (index == data.length - 1) args.producers = ProducersIDs;
                });
            }));
            
            // Cast
            let CastPromises = [];
            args.directors.forEach((person) => {
                CastPromises.push(Person.findOne(person));
            });
            FixPromises.push(Promise.all(CastPromises).then((data) => {
                let CastIDs = [];
                data.forEach((person, index) => {
                    CastIDs.push(person._id);
                    if (index == data.length - 1) args.persons = CastIDs;
                });
            }));
        
            Promise.all(FixPromises).then(() => {
                let NewMovie = new Movie(args); 
                NewMovie.save().then((movie) => {
                    Movie.findById(movie._id).populate('genres').then((movie) => {
                        resolve(movie);
                    });
                }).catch((err) => {
                    reject(err)
                });
            })

        });

    },
    editMovie: (_, args) => {
        let select = args.select;
        delete args.select;
        args.$pull = args.pull;
        delete args.pull;
        args.$push = args.push;
        delete args.push;
        let MovieObject = Movie.findOneAndUpdate(select, args, {new: true});
        return MovieObject.exec();
    },
    deleteMovie: (_, args) => {
        return Movie.findOneAndRemove(args).exec();
    }
  }
};

module.exports = {
  MovieSchema: typeDefs,
  MovieResolvers: resolvers
};
