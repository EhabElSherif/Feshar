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
    persons: (_, args) => {
        return new Promise((resolve,reject)=>{
            let NationalityObj = null;

            // Name
            if(args.name){
                args.name = new RegExp(args.name, 'i');
            }
            // Description
            if(args.description){
                args.description = new RegExp(args.description,'i');
            }
            // Nationality
            if(args.nationality){
                Nationality.findOne({name:args.nationality.name},(err,res)=>{
                    if(res){
                        args.nationality = res._id;
                    }else{
                        delete args.nationality;
                    }
                });
            }
            console.log(args);
            Person.find(args).populate('nationality').then((persons)=>{
                resolve(persons);
            }).catch((err)=>{
                reject(err);
            });
        });
    },
    person: (_, args) => {
        Person.findOne({name: args.name})
    }
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
        return Person.findOneAndRemove(args).exec();
    }
  }
};

module.exports = {
  PersonSchema: typeDefs,
  PersonResolvers: resolvers
};
