const mongoose = require('mongoose');
const {Schema} = mongoose;

const {custcore} = require('./CustomerSchemes.js');

var jobCore = {
    id: {type:String,default:''},
    name: {type:String,default:''},
    custid: {type:String,default:''},
    street: {type:String,default:''},
    unit: {type:String,default:''},
    city: {type:String,default:''},
    state: {type:String,default:''},
    zip: {type:String,default:''},

    customer: custcore,

    estimator: {type:String,default:''},
    quoteId: {type:String,default:''},

    costing: {type:Object,default:null},

    dept: {type:String,default:''},
    cat: {type:String,default:''},
    
    status: {type:String,default:'O'},
    progress: {type:String,default:'active'},

    opendate: {type:Date,default:Date.now()},
    lastdate: {type:Date,default:Date.now()},
    scheddate:{type:Date,default:null},
    apprdate: {type:Date,default:null},
    closedate: {type:Date,default:null}    
}


/**
 * From here, create any more specific structures needed.
 * These will override the defaults provided in the jobCore
 */


var job350 = new Schema({...jobCore,
    dept:{type:String,default:'350'},
    info:{
        contracts:Array
    }
});
var job400 = {}

module.exports={
    Job350: job350
}