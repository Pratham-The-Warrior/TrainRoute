const path = require('path');
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  ENGINE_PATH: path.resolve(__dirname, '../../', process.env.ENGINE_PATH || '../engine/bin/train_engine'),
  DATA_PATH: path.resolve(__dirname, '../../', process.env.DATA_PATH || '../engine/data/trains.json'),
  NODE_ENV: process.env.NODE_ENV || 'development'
};
