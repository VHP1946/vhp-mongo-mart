const {Core}=require('vhp-api');
const fs = require("fs");
const path = require('path');

let API = new Core({
  auth:{
      user:"VOGCH", 
      pswrd:"vogel123"
  },
  host:'http://localhost:8080/',//'http://18.191.223.80/',//'http://192.168.0.49:8000/',//
  sync:false, 
  dev:{comments:false},
  //client:false
});

let fpack={
  db:'Replacement',
  collect:'Projects350',
  method:'QUERY',
  options:{
    query:{
    }
  }
}
let rpack={
  db:'Company',
  collect:'Device',
  method:'REMOVE',
  options:{
    query:{
      _id: '64baaa3a668fc782c21eea7e'
    }
  }
}
let upack={
  db:'Company',
  collect:'Employee',
  method:'UPDATE',
  options:{
    query:{
      empID:'07'
    },
    update:{
      fName:'First',
      lName:'Last'
    }
  }
}
let ipack={
  db:'Company',
  collect:'Device',
  method:'INSERT',
  options:{
    docs:{}
  }
}

/*
let emppath = path.join(__dirname,'./data/empbackup.json');
let accpath = path.join(__dirname,'./data/accbackup.json')
let depath = path.join(__dirname,'./data/devicelog.json');

let suppath = path.join(__dirname,'./data/supbackup.json');
let qupath = path.join(__dirname,'./data/qupathbackup.json');
let jopath = path.join(__dirname,'./data/jobackup.json');

let ppath = require(depath);//accpath;
*/
//(path.join(__dirname,'pricekeys.json'),JSON.stringify(pkeys));



//for(let x=0;x<ppath.length;x++){
//  ppath[x]._id = undefined;
//}
///*
//ipack.options.docs = ppath;


API.SENDrequest({
  pack:fpack,
  route:'STORE'
}).then(answr=>{
  console.log('ANSWER->',answr.result)
})
//*/



















/*
let oldAPI = new Core({
    auth:{
        user:"VOGCH", 
        pswrd:"vogel123"
    },
    host:'http:/localhost:8080/',
    sync:false, 
    dev:{comments:true}
});
let newAPI = new Core({
  auth:{
      user:"VOGCH", 
      pswrd:"vogel123"
  },
  host:'http:/localhost:8000/',
  sync:false, 
  dev:{comments:true}
});

let quote = {
  collect:'apps',
  db:'mquotes',
  store:'RRQ',
  method:'query',
  options:{
    query:{}
  }
}


oldAPI.SENDrequest({pack:fpack,route:'STORE'}).then(answr=>{
  //answr.result
  console.log('QUERY ',answr);
  ipack.options.docs = answr.result;
  newAPI.SENDrequest({pack:ipack,route:'STORE'}).then(a=>{
    console.log('INSERT ',a);
  });
});
*/