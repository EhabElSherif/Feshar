/**
 * Configration
 */
// Create the app
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Use Cors (Used in GraphQL) 
const CORS = require('cors');
app.use(CORS())

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create the http server
const server = http.createServer(app);

// Connect the .env file
require('dotenv').config({path: '../.env'});

// Get the database connector
const db = require('./db.js');

const Port = process.env.PORT || '3000';

app.set('port', Port)

// Create the db connection and start the listening
db().then(async () => {
    server.listen(Port, () => console.log(`API running on http://localhost:${Port}`));
});

/**
 * GraphQL
 */
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/graphql-schema');
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

/**
 * Angular
 */
const AngularPath = process.env.ANGULAR_PATH;
// Point static path to dist
app.use(express.static(path.join(__dirname, `../${AngularPath}`)));
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `../${AngularPath}/index.html`));
});

/**
 * Socket.io
 */
var io = require('socket.io')(server);
io.on('connection', function(client) {
  console.log(`${client.id} has connected!`);
  client.on('disconnect', function() {
    console.log(`${client.id} has disconnected`);
  });
});