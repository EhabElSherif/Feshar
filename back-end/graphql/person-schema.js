const Person = require("../models/person");
const Nationality = require("../models/nationality");

const typeDefs = `
    extend type Query {
        persons(
            name: String
            gender: Gender
            title: Title
            image_url: String
            birth_date: String
            created_at: String
            nationality: InputNationality
            description: String
        ): [Person],

        person(
            name: String
            gender: Gender
            title: Title
            image_url: String
            birth_date: String
            created_at: String
            nationality: InputNationality
            description: String
        ): Person
    }

    extend type Mutation {
        addPerson(
            name: String
            gender: Gender
            title: Title
            image_url: String
            birth_date: String
            created_at: String
            nationality: InputNationality
            description: String
        ): Person,

        editPerson(
            select: InputPerson

            name: String
            gender: Gender
            title: Title
            image_url: String
            birth_date: String
            created_at: String
            nationality: InputNationality
            description: String
        ): Person,

        deletePerson(
            name: String
            gender: Gender
            title: Title
            image_url: String
            birth_date: String
            created_at: String
            nationality: InputNationality
            description: String
        ): Person,
    }
`;

const resolvers = {
  Query: {
    persons: (_, args) => Person.find({name: new RegExp(args.name, 'i')}).populate('nationality'),
    person: (_, args) => Person.findOne({name: args.name})
  },

  Mutation: {
    addPerson: (_, args) => {
        return new Promise((resolve,reject)=>{
            Nationality.findOne({name:args.nationality.name},(err,res)=>{
                if(res){
                    args.nationality = res._id;
                    let NewPerson = new Person (args);
                    NewPerson.save().then((person) => {
                        Person.findById(person._id).populate('nationality').then((person) => {
                            resolve(person);
                        });
                    }).catch((err) => {
                        reject(err)
                    });
                }
                else{
                    err = "Invalid value for nationality property";
                    reject(err);
                }
            });
        });
    },
    editPerson: (_, args) => {

        let select = args.select;
        delete args.select;

        let PersonObject = Person.findOneAndUpdate(select, args, {new: true});
        return PersonObject.exec();
    },
    deletePerson: (_, args) => {
        return Person.findOneAndRemove({name: args.name}).exec();
    }
  }
};

module.exports = {
  PersonSchema: typeDefs,
  PersonResolvers: resolvers
};
