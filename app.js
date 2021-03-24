require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { logger } = require('./utils/logger');
const { dbConfig } = require('./config/db');

const app = express();
const server = http.Server(app);

mongoose
  .connect(
    dbConfig.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    server.listen(4000);
  })
  .catch((err) => logger.error(err));

const closeOnExit = async (event) => {
  try {
    await mongoose.closeDBConnection(event);
    process.exit(0);
  } catch (e) {
    process.exit(1);
  }
};

process.once('SIGINT', () => closeOnExit('SIGINT'));
process.once('SIGTERM', () => closeOnExit('SIGTERM'));

module.exports = server;
