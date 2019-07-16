const User = require("../models/user");

const typeDefs = `
    extend type Query {

        users: [User],
        
        user(
            username: String
            type: Type
            password: String
            email: String
            phonenumber: String
            token: InputToken
            tokens: [InputToken]
            name: InputName
            first_name: String
            last_name: String
        ): User
    }

    extend type Mutation {

        addUser (
            username: String
            type: Type
            password: String
            email: String
            phonenumber: String
            token: InputToken
            tokens: [InputToken]
            name: InputName
            first_name: String
            last_name: String
        ) : User,

        editUser(
            select: UserSelectProperties
            username: String
            email: String
            phonenumber: String
            token: InputToken
            tokens: [InputToken]
            name: InputName
            first_name: String
            last_name: String
        ): User
    }
`;

const resolvers = {
  Query: {
    users: () => User.find({}),
    user: (_, args) => {
      if (args.token) {
        if (!args.$and) args.$and = [];
        args.$and = [
          {
            tokens: {
              $elemMatch: args.token
            }
          }
        ];
        delete args.token;
      }
      if (args.tokens) {
        if (!args.$and) args.$and = [];
        args.tokens.forEach(token => {
          args.$and.push({
            tokens: {
              $elemMatch: token
            }
          });
        });
        delete args.tokens;
      }
      if (args.name) {
        if (args.name.first_name)
          args["name.first_name"] = args.name.first_name;
        if (args.name.last_name) args["name.last_name"] = args.name.last_name;
        delete args.name;
      }
      if (args.first_name) {
        args["name.first_name"] = args.first_name;
        delete args.name;
        delete args.first_name;
      }
      if (args.last_name) {
        args["name.last_name"] = args.last_name;
        delete args.name;
        delete args.last_name;
      }
      return User.findOne(args);
    }
  },

  Mutation: {
    addUser: (_, args) => {
      if (args.first_name || args.last_name) {
        args.name = {};
        args.name.first_name = args.first_name;
        args.name.last_name = args.last_name;
      }
      if (args.token) {
        if (!args.tokens) args.tokens = [];
        args.tokens.push(token);
      }
      let UserObject = new User(args);
      return UserObject.save();
    },
    editUser: (_, args) => {
      if (args.first_name || args.last_name) {
        args.name = {};
        args.name.first_name = args.first_name;
        args.name.last_name = args.last_name;
      }
      if (args.token) {
        if (!args.tokens) args.tokens = [];
        args.tokens.push(token);
      }
      let selectQuery = args.select;
      delete args.select;
      let UserObject = User.findOneAndUpdate(selectQuery, args);
      return UserObject.exec();
    }
  }
};

module.exports = {
  // UserExecutableSchema: makeExecutableSchema({
  //     typeDefs,
  //     resolvers,
  // }),
  UserSchema: typeDefs,
  UserResolvers: resolvers
};
