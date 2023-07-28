const mongoose = require('mongoose');
const VHPMongoDB=require('./mongodb.js');
//const schemas = require('../dev/models/vhp-schemas');
module.exports = class VHPMongoCluster{
    /**
     * Will attempt to connect to a mongodb server based on the
     * uri passed. You can pass function to afterConnect to run
     * after a connection has been successful.
     * 
     * @param {String} uri 
     * @param {Function} afterConnect 
     */
    constructor(creds={
        user:'',
        pswrd:'',
        cluster:'',
        clusterid:''
    },dbconfig={}){
        this.uri = `mongodb+srv://${creds.user}:${creds.pswrd}@${creds.cluster}.${creds.clusterid}.mongodb.net/`
        this.admin = null; //hold admin access
        this.dbs = {};
        this.startup = mongoose.createConnection(this.uri).asPromise();
        this.startup.then(conn=>{
            console.log('Connected -> ',creds.cluster);
            this.connection = conn;
            this.admin = this.connection.db.admin();
            this.admin.listDatabases().then(res=>{
                let dblist=res.databases;
                for(let x=0,l=dblist.length;x<l;x++){
                    console.log('Setup ',dblist[x])
                    //try{
                        if(dbconfig[dblist[x].name]){
                            this.dbs[dblist[x].name] = new VHPMongoDB(this.uri,dblist[x].name,dbconfig[dblist[x].name])
                        }
                    //}catch{}
                }
                console.log(this.dbs);
            })
            //afterConnect()
        }).catch(err=>{console.log(err)})
    }

    /**
     * Here are some notes on this
     * 
     * Employee_Account
     * 
     * @param {{db:String,collect:String,method:String,options:Object}} pack
     * @returns 
     */
    ROUTErequest(pack,res){
        return new Promise((resolve,reject)=>{
            console.log('in request',pack);
            if(this.validPack(pack)){
                console.log(this.dbs,pack.db);
                if(this.dbs[pack.db]!=undefined){
                    return resolve(this.dbs[pack.db].request(pack,res));
                }else{return resolve({success:false,msg:'Not a database',results:null})}
            }else{return resolve({success:false,msg:'Bad pack'})}
        });
    }
    validPack(pack=null){
        if(pack){
            try{
                if(pack.db && pack.collect && pack.method){return true;}
                else{return false;}
            }catch{return true}
        }else{return false;}
    }
}
