const { makeExecutableSchema } = require("graphql-tools");

const Defs = require('./defs');
const { UserSchema, UserResolvers } = require('./user-schema');
const { GenreSchema, GenreResolvers } = require('./genre-schema');
const { MovieSchema, MovieResolvers } = require('./movie-schema');
const { NationalitySchema, NationalityResolvers } = require('./nationality-schema');
const { PersonSchema, PersonResolvers } = require('./person-schema');

const Schema = Defs + UserSchema + GenreSchema + MovieSchema + NationalitySchema + PersonSchema;
const Resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...GenreResolvers.Query,
    ...MovieResolvers.Query,
    ...NationalityResolvers.Query,
    ...PersonResolvers.Query
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...GenreResolvers.Mutation,
    ...MovieResolvers.Mutation,
    ...NationalityResolvers.Mutation,
    ...PersonResolvers.Mutation
  }
};

module.exports = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers
});