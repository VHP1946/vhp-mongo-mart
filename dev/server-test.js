const {Core}=require('vhp-api');
const fs = require("fs");
const path = require('path');

let API = new Core({
  auth:{
      user:"VOGCH", 
      pswrd:"vogel123"
  },
  host:'http://localhost:8000/',//'http://192.168.0.49:8000/',//'http://18.191.223.80/',//
  sync:false, 
  dev:{comments:false}
});

let fpack={
  db:'Quotes',
  collect:'Quote350',
  method:'QUERY',
  options:{
    query:{
    }
  }
}
let rpack={
  db:'Company',
  collect:'Employee',
  method:'REMOVE',
  options:{
    query:{
      empID:'07'
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
  db:'Quotes',
  collect:'Quote350',
  method:'INSERT',
  options:{
    docs:null
  }
}

API.SENDrequest({
  pack:fpack,
  route:'STORE'
}).then(answr=>console.log('ANSWER->',answr))




















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