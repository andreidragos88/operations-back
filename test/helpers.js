const operationService = require('../services/operation');
let server = require('../app');
//const { MongoMemoryServer } = require('mongodb-memory-server');
const socketEvents = require('../socket/events');



module.exports = {
    operationService,
    server,
    socketEvents
}