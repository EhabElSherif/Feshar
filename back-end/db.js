const mongoose =  require('mongoose');

const connectDb = (URL) => {
  console.log(`DB_URL : ${URL === undefined ? process.env.DATABASE_URL : URL}`);
  return mongoose.connect(URL === undefined ? process.env.DATABASE_URL : URL, {
    autoIndex: false,
    useNewUrlParser: true,
  });
};

module.exports = connectDb;
