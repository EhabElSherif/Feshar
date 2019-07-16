const Series = require("../models/series");

const typeDefs = `
    extend type Query {

        series: [Series],
        
        oneSeries(
            name: String
            genres: InputGenre
            rate: Float
            directors: [InputDirector]
            producers: [InputProducer]
            season: [InputSeason]
            created_at: String
            cast: [InputActor]
            description: String
        ): Series
    }

    extend type Mutation {

        addSeries(
            name: String
            genres: InputGenre
            rate: Float
            directors: [InputDirector]
            producers: [InputProducer]
            season: [InputSeason]
            created_at: String
            cast: [InputActor]
            description: String
        ): Series,

        editSeries(
            select: SeriesSelectProperties
            name: String
            genres: InputGenre
            rate: Float
            directors: [InputDirector]
            producers: [InputProducer]
            season: [InputSeason]
            created_at: String
            cast: [InputActor]
            description: String
        ): Series
    }
`;

const resolvers = {
  Query: {
    series: () => Series.find({}),
    oneSeries: (_, args) => {
      return Series.findOne(args);
    }
  },

  Mutation: {
    addSeries: (_, args) => {
      let SeriesObject = new Series(args);
      return SeriesObject.save();
    },
    editSeries: (_, args) => {
      let selectQuery = args.select;
      delete args.select;
      let SeriesObject = Series.findOneAndUpdate(selectQuery, args);
      return SeriesObject.exec();
    }
  }
};

module.exports = {
  // UserExecutableSchema: makeExecutableSchema({
  //     typeDefs,
  //     resolvers,
  // }),
  SeriesSchema: typeDefs,
  SeriesResolvers: resolvers
};
