const mongoose = require('mongoose');
const {Schema} = mongoose;

const {custcore} = require('./CustomerSchemes.js');

var quoteCore = {
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
    info:{type:Object,default:{}},
    dept: {type:String,default:''},
    cat: {type:String,default:''},
    
    status: {type:String,default:'O'},
    progress: {type:String,default:'active'},
    sold:{type:Boolean,default:false},
    opendate: {type:Date,default:Date.now()},
    lastdate: {type:Date,default:Date.now()},
    subdate: {type:Date,default:null},
    apprdate: {type:Date,default:null},
    closedate: {type:Date,default:null},
    froot:{type:String,default:''}
}



/**
 * From here, create any more specific structures needed.
 * These will override the defaults provided in the quoteCore
 */


var quote350 = new Schema({...quoteCore,
    cat:{type:String,default:'350'},
    info:{
        siteinfo: {type:Object,default:null},
        systems: Array,
        key: {type:Object,default:null},
        tracking: {type:Object,default:null}
}},{
	toJSON:{virtuals:true},
	toObject:{virtuals:true},
});

var quote400 = {

}

module.exports={
    Quote350: quote350,
    Quote400: quote400
}