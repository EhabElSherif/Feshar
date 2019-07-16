const Genre = require("../models/genre");

const typeDefs = `
    extend type Query {
        genres(
            name: String
        ): [Genre],

        genre(
            name: String
        ): Genre
    }

    extend type Mutation {
        addGenre(
            name: String
        ): Genre,

        editGenre(
            name: String,
            new_name: String
        ): Genre,

        deleteGenre(
            name: String
        ): Genre,
    }
`;

const resolvers = {
  Query: {
    genres: (_, args) => Genre.find({name: new RegExp(args.name, 'i')}),
    genre: (_, args) => Genre.findOne({name: args.name})
  },

  Mutation: {
    addGenre: (_, args) => {
        let NewGenre = new Genre({name: args.name});
        return NewGenre.save(); 
    },
    editGenre: (_, args) => {
        let GenreObject = Genre.findOneAndUpdate({name: args.name}, {name: args.new_name}, {new: true});
        return GenreObject.exec();
    },
    deleteGenre: (_, args) => {
        return Genre.findOneAndRemove({name: args.name}).exec();
    }
  }
};

module.exports = {
  GenreSchema: typeDefs,
  GenreResolvers: resolvers
};
