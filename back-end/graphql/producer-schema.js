const Producer = require("../models/producer");
const Nationality = require("../models/nationality");

const typeDefs = `
    extend type Query {
        producers(
            name: String
            owner: InputPerson
            image_url: String
            birth_date: String
            created_at: String
            nationality: InputNationality
            description: String
        ): [Producer],

        producer(
            name: String
            owner: InputPerson
            image_url: String
            birth_date: String
            created_at: String
            nationality: InputNationality
            description: String
        ): Producer
    }

    extend type Mutation {
        addProducer(
            name: String
            owner: InputPerson
            image_url: String
            birth_date: String
            created_at: String
            nationality: InputNationality
            description: String
        ): Producer,

        editProducer(
            select: InputProducer

            name: String
            owner: InputPerson
            image_url: String
            birth_date: String
            created_at: String
            nationality: InputNationality
            description: String
        ): Producer,

        deleteProducer(
            name: String
            owner: InputPerson
            image_url: String
            birth_date: String
            created_at: String
            nationality: InputNationality
            description: String
        ): Producer,
    }
`;

const resolvers = {
  Query: {
    producers: (_, args) => Producer.find({name: new RegExp(args.name, 'i')}).populate('nationality'),
    producer: (_, args) => Producer.findOne({name: args.name})
  },

  Mutation: {
    addProducer: (_, args) => {
        return new Promise((resolve,reject)=>{
            Nationality.findOne({name:args.nationality.name},(err,res)=>{
                if(res){
                    args.nationality = res._id;
                    let NewProducer = new Producer (args);
                    NewProducer.save().then((producer) => {
                        Producer.findById(producer._id).populate('nationality').then((producer) => {
                            resolve(producer);
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
    editProducer: (_, args) => {

        let select = args.select;
        delete args.select;

        let ProducerObject = Producer.findOneAndUpdate(select, args, {new: true});
        return ProducerObject.exec();
    },
    deleteProducer: (_, args) => {
        return Producer.findOneAndRemove(args).exec();
    }
  }
};

module.exports = {
  ProducerSchema: typeDefs,
  ProducerResolvers: resolvers
};
