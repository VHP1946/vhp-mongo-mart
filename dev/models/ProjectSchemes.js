const mongoose = require('mongoose');
const {Schema} = mongoose;

const {custcore} = require('./CustomerSchemes.js');

var projectCore = {
    id: {type:String,default:''},

    ref:{type:String,default:''},
    name: {type:String,default:''},

    custid: {type:String,default:''},
    street: {type:String,default:''},
    unit: {type:String,default:''},
    city: {type:String,default:''},
    state: {type:String,default:''},
    zip: {type:String,default:''},

    customer: custcore,
    estimator: {type:String,default:''},

    dept: {type:String,default:''},
    cat: {type:String,default:''},

    stage:{type:String,default:'quote'},
    status: {type:String,default:'active'},

    sold:{type:Boolean,default:false},

    opendate: {type:Date,default:Date.now()},
    lastdate: {type:Date,default:Date.now()},
    closedate: {type:Date,default:null},

    datelog:{type:Array,default:[]},

    info:{type:Object,default:{}},

    tracking: {type:Array,default:[]},//holds doc ids for tracking

    froot:{type:String,default:''}
}

//will have a connection to projects
var trackingCore = {
    id:{type:String,default:''},//unique, given to item being tracked

    stages:{type:Array,default:[]},//hold 'ids' of quotes and jobs from the project
    status:{type:String,default:''},
    progress:{type:String,default:''},

    client:{type:String,default:''},
    email:{type:String,default:''},
    phone:{type:String,default:''},
    
    street:{type:String,default:''},
    unit:{type:String,default:''},
    city:{type:String,default:''},
    zip:{type:String,default:''},

    comp:{type:String,default:'VHC'},
    estimator:{type:String,default:''},
    date:{type:Date,default:Date.now},

    finance:{type:String,default:''},
    bookprc:{type:Boolean,default:true},
    rewards:{type:String,default:''},
    saletype:{type:String,default:''},
    lead:{type:String,default:''},
    source:{type:String,default:''},
    cat:{type:String,default:''},

    prstvia:{type:String,default:null},
    prstdate:{type:String,default:''},
    time:{type:String,default:''},

    amount:{type:Number,default:0},
    quoted:{type:Number,default:0},

    sold:{type:Boolean,default:false},
    paid:{type:Boolean,default:false},
    closed:{type:Boolean,default:false}

}

var costingCore={

}
/**
 * From here, create any more specific structures needed.
 * These will override the defaults provided in the quoteCore
 */


module.exports ={
    Projects350 : new Schema({...projectCore,
        cat:{type:String,default:'350'}
    },{
        toJSON:{virtuals:true},
        toObject:{virtuals:true},
    }),
    Tracking350: new Schema({...trackingCore})
}