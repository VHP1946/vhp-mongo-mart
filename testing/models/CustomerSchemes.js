const mongoose = require('mongoose');
const {Schema} = mongoose;

var customercore = {
    id: {type:String,default:''},
    name: {type:String,default:''},
    fname: {type:String,default:''},
    lname: {type:String,default:''},
    street: {type:String,default:''},
    unit: {type:String,default:''},
    city: {type:String,default:''},
    state: {type:String,default:''},
    zip: {type:String,default:''},
    strdate: {type:String,default:''},
    lastsale: {type:String,default:''},
    type: {type:String,default:''},
    phone: {type:String,default:''},
    phone2: {type:String,default:''},
    email: {type:String,default:''},
    rep: {type:String,default:''}
}

var leadCore = {
    custCode: {type:String,default:''},
    client: {type:String,default:''},
    date: {type:Date,default:null},
    email: {type:String,default:''},
    phone: {type:String,default:''},
    street: {type:String,default:''},
    unit: {type:String,default:''},
    city: {type:String,default:''},
    zip: {type:String,default:''},
    comp: {type:String,default:''},
    dept: {type:String,default:''},
    estimator: {type:String,default:''},
    lead: {type:String,default:''},
    source: {type:String,default:''},
    log: {type:String,default:''}   //logging lead through lifecycle
}

var leadSchema= new Schema(leadCore);

var cBidSchema = new Schema({...leadCore,...{
	jobname: {type:String,default:''},
	primary: {type:String,default:''},
	profit: {type:Number,default:0},
	amount: {type:String,default:''},
	bid: {type:String,default:''},
	sqft: {type:Number,default:0},
	tonnage: {type:Number,default:0},
	type: {type:String,default:''},
	bldtype: {type:String,default:''},
	margin: {type:String,default:''},
	notes: {type:String,default:''}
}});

module.exports={
    custcore:customercore,
    Lead:leadSchema,
    Cbid:cBidSchema
}