const mongoose = require('mongoose');

module.exports = class VHPMongoDB{
    constructor(uri,db,schemas={}){
        this.uri = `${uri + db}?retryWrites=true&w=majority`
        this.startup = mongoose.createConnection(this.uri).asPromise();
        this.connection = null; //hold original conneciton

        this.schemas=schemas;
        this.models={}
        this.startup.then(conn=>{
            this.connection = conn;
            for(let s in this.schemas){
                this.models[s]=this.connection.model(s,this.schemas[s]);
            }  
        })

    }
    request(pack,res){
        return new Promise((resolve,reject)=>{
            let dbcursor = null;
            let populates = pack.collect.split('_');
            pack.collect=populates.shift();
            if(this.models[pack.collect]){//check that pack.collect has a schema
                dbcursor = this.models[pack.collect];//this.connection.useDb(pack.db,{useCache:true}).model(pack.collect,this.schemas[pack.collect]);
                if(pack.options!=undefined){
                    let qtimein = Date.now();
                    let runner = null;
                    switch(pack.method!=undefined?pack.method.toUpperCase():''){
                        case 'QUERY':{console.log('query');runner = this.QUERYdocs(dbcursor,pack,populates);break;}
                        case 'REMOVE':{console.log('remove');runner = this.REMOVEdocs(dbcursor,pack);break;}
                        case 'UPDATE':{console.log('update');runner = this.UPDATEdocs(dbcursor,pack);break;}
                        case 'INSERT':{console.log('insert');runner = this.INSERTdocs(dbcursor,pack);break;}
                    }
                    if(runner){
                        runner.then(result=>{
                            console.log('TIME to process request ',Date.now()-qtimein);
                            res.write(JSON.stringify(result));
                            res.end();
                            return resolve({success:true});
                        })
                    }else{return resolve({success:false,msg:'Could not resolve method',results:null});}
                }else{return resolve({success:false,msg:'No Options',results:null})}
            }else{return resolve({success:false,msg:'Not a collection',results:null});}
        });
    }

    QUERYdocs(dbcursor, pack,poplist=[]){
        return new Promise((resolve,reject)=>{
            let request = null;
            if(pack.options.query){
                if(poplist.length>0){//if there are things to populate, loop through and establish the connection
                    for(let x=0,l=poplist.length;x<l;x++){
                        if(this.schemas[pack.collect].virtuals[poplist[x]]){
                            
                            this.connection.useDb(pack.db,{useCache:true}).model(this.schemas[pack.collect].virtuals[poplist[x]].options.ref,this.schemas[this.schemas[pack.collect].virtuals[poplist[x]].options.ref]);
                        }
                    }
                    request = dbcursor.find(pack.options.query,pack.options.projection,pack.options.options).populate(poplist);
                }else{request = dbcursor.find(pack.options.query,pack.options.projection,pack.options.options).lean();}
                request.then((res)=>{
                    console.log('done query')
                    return resolve({success:true,msg:'Queried',result:res});
                });
            }else{return resolve({success:false,msg:'No query option',result:null})}
        });
    }

    REMOVEdocs(dbcursor,pack){
        return new Promise((resolve,reject)=>{
            let {query}=pack.options;
            if(query!=undefined){
                dbcursor.deleteMany(pack.options.query).then(result=>{
                    return resolve({success:true,msg:'',result:result})
                }).catch(err=>{return resolve({success:false,msg:err,result:null})})
            }else{return resolve({success:false,msg:'bad options',result:null})}
        });
    }

    INSERTdocs(dbcursor,pack){
        return new Promise((resolve,reject)=>{
            if(pack.options.docs){
                dbcursor.insertMany(pack.options.docs).then(result=>{
                    return resolve({success:true,msg:'',result:result})
                }).catch(err=>{return resolve({success:false,msg:err,result:null})})
            }else{return resolve({success:false,msg:'bad options',result:null})}
        });
    }

    UPDATEdocs(dbcursor,pack){
        return new Promise((resolve,reject)=>{
            if(pack.options.query!=undefined&&pack.options.update!=undefined){
                dbcursor.updateMany(pack.options.query,pack.options.update).then(result=>{
                    return resolve({success:true,msg:'',result:result})
                }).catch(err=>{return resolve({success:false,msg:err,result:null})})
            }else{return resolve({success:false,msg:'bad options',result:null})}
        });
    }

}