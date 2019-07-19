const Nationality = require("../models/nationality");

const typeDefs = `
    extend type Query {
        nationalities(
            name: String
        ): [Nationality],

        nationality(
            name: String
        ): Nationality
    }

    extend type Mutation {
        addNationlaity(
            name: String
        ): Nationality,

        editNationlaity(
            name: String,
            new_name: String
        ): Nationality,

        deleteNationlaity(
            name: String
        ): Nationality,
    }
`;

const resolvers = {
  Query: {
    nationalities: (_, args) => Nationality.find({name: new RegExp(args.name, 'i')}),
    nationality: (_, args) => Nationality.findOne({name: args.name})
  },

  Mutation: {
    addNationlaity: (_, args) => {
        let NewNationlaity = new Nationality({name: args.name});
        return NewNationlaity.save(); 
    },
    editNationlaity: (_, args) => {
        let NationlaityObject = Nationality.findOneAndUpdate({name: args.name}, {name: args.new_name}, {new: true});
        return NationlaityObject.exec();
    },
    deleteNationlaity: (_, args) => {
        return Nationality.findOneAndRemove({name: args.name}).exec();
    }
  }
};

module.exports = {
  NationalitySchema: typeDefs,
  NationalityResolvers: resolvers
};
