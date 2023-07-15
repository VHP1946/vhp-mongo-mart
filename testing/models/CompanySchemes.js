const mongoose = require('mongoose');
const {Schema} = mongoose;

var empSchema = new Schema({
	empID: {type:String,default:''},
	name: {type:String,default:''},
	fName: {type:String,default:''},
	lName: {type:String,default:''},
	
	coid: {type:String,default:''},
	title: {type:String,default:''},
	type: {type:String,default:''},
	repTo: {type:String,default:''}, //empID
	
	jobDesc: {type:String,default:''},
	joined: {type:Date,default:null},
	bday: {type:Date,default:null},
	skills: {type:String,default:''},
	interest: {type:String,default:''},

	tasks: Array,
	goals: Array,
	picture: {type:String,default:''},
},
{	
	toJSON:{virtuals:true},
	toObject:{virtuals:true},
	strictQuery: false,
	timestamps: true,
    virtuals: {
        fullName: {
            get(){
                return this.fName + ' ' + this.lName;
            },
            set(v){
                this.fName = v.substr(0, v.indexOf(' '));
                this.lName = v.substr(v.indexOf(' ')+1);
            }
        },
		Account: {
			options:{
				ref: 'Account',
				localField: 'empID',
				foreignField: 'empID'
			}
		},
		Device: {
			options:{
				ref: 'Device',
				localField: 'empID',
				foreignField: 'empID'
			}
		}
    }
});

var devSchema = new Schema({
	devID: {type:String,default:''},
	empID: {type:String,default:''},
	name: {type:String,default:''},
	type: {type:String,default:''},
	manf: {type:String,default:''},
	model: {type:String,default:''},
	serial: {type:String,default:''},
	simNum: {type:String,default:''},
	simRef: {type:String,default:''},
	iccid: {type:String,default:''},
	userName: {type:String,default:''},
	userLock: {type:String,default:''},
	lock: {type:String,default:''},
	
	purchaseDate: {type:Date,default:null},
	upgradeDate: {type:Date,default:null}
});

var accSchema = new Schema({
	empID: {type:String,default:''},
	type: {type:String,default:''},
	user: {type:String,default:''}, // email OR username
	pswrd: {type:String,default:''},
	twoFactors: [{type:String,contact:String}],
	devices:Array,
	active: Boolean,
	apps:Array,
	permissions:Array,
	admin:Boolean,
	resetPswrd: {type:Date,default:null}
});

var userSchema = new Schema({
	empID: {type:String,default:''},
	user: {type:String,default:''},
	pswrd: {type:String,default:''},
	apps: Array,
	permissions: Array,
	admin: Boolean
});

module.exports={
    Employee:empSchema,
    Device:devSchema,
    Account:accSchema,
	User:userSchema
}
