const { makeExecutableSchema } = require("graphql-tools");

const Defs = require('./defs');
const { UserSchema, UserResolvers } = require('./user-schema');
const { GenreSchema, GenreResolvers } = require('./genre-schema');
const { MovieSchema, MovieResolvers } = require('./movie-schema');

const Schema = Defs + UserSchema + GenreSchema + MovieSchema;
const Resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...GenreResolvers.Query,
    ...MovieResolvers.Query
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...GenreResolvers.Mutation,
    ...MovieResolvers.Mutation
  }
};

module.exports = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers
});