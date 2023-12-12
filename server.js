//Libraries used in project
const http = require('http');
const VHPMongoCluster=require('./bin/mongocluster.js');




module.exports = class VHPMongoMart{
  /**
   * Something here
   * @param {*} config
   */
  constructor(config=null){
    if(!config){
      if(process.env.PORT){
        console.log('env')
        config = process.env;
      }
    }
    this.config = config;
    this.server = null;
    this.listening = false;
    if(config){
      this.port = config.PORT;
      this.server = http.createServer();
      this.mongo = new VHPMongoCluster(config.creds,config.schemes);
      this.server.on('request',(req,res)=>{//handle headers =>
        if(req.rawHeaders['Sec-Fetch-Site']!='same-origin'){
          if(false){//flag to handle cors, change in config file
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
            res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
          }
        }
      });
      this.server.on('request',(req,res)=>{
        console.log('Request from mart');
        let data = '';

        req.on('data',chunk=>{data+=chunk;});

        req.on('end',()=>{
          try{data=JSON.parse(data);}catch{data={};}

          let vpak=data;
          console.log('MART PACK',vpak);
          let log = { //prep request log
            process:'COREprocess',
            info:{
              url:req.url,
              cip:req.connection.remoteAddress,
            }
          }
          this.mongo.ROUTErequest(vpak,res).then(result=>{
            console.log('END ',result);
            if(!result.success){
              res.write(JSON.stringify(result));
              res.end();
            }
          });
        });
      });
      this.mongo.startup.then(answr=>{
        if(this.mongo.connection){
          this.server.listen(config.PORT,()=>{console.log('Mart Listening: ',config.PORT)});
          this.listening = true;
        }
      });
    }
  }
}
