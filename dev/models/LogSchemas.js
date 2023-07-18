const mongoose = require('mongoose');
const {Schema} = mongoose;

var logSchema = new Schema({
    timein:{type:Date,default:null},
    timecheck:{type:Date,default:null},
    timeout:{type:Date,default:null},
    msg: {type:String,default:''},
    info: {type:Object,default:null},
    track:Array
});

module.exports={
    Corelog:logSchema
}