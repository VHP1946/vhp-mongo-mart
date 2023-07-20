const path = require('path');
let schemes = require('./models/vhp-schemas.js');
let Mart = require('../server.js');

let config = require('./config.json');
config.schemes = schemes;



let mongomart = new Mart(config);


