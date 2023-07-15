const path = require('path');
let schemes = require('./models/vhp-schemas.js');
let Mart = require('../server.js');

let config = require('./config.json');
config.schemes = schemes;
console.log(config)
let mongomart = new Mart(config);


