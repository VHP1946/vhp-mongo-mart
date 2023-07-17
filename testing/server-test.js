const {Core}=require('vhp-api');
const fs = require("fs");
const path = require('path');
let API = new Core({
    auth:{
        user:"VOGCH", 
        pswrd:"vogel123"
    },
    host:'http://localhost:8080/',
    sync:false, 
    dev:{comments:true}
});

let oldMart = new Core({
  auth:{
      user:"VOGCH", 
      pswrd:"vogel123"
  },
  sync:false,
  dev:{comments:true,https:true}

})

let fpack={
  db:'Quotes',
  collect:'Quote350',
  method:'QUERY',
  options:{
    query:{id:'RRQ-1683559443637'}
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
    docs:{}
  }
}
let quote = {
  collect:'apps',
  db:'mquotes',
  store:'RRQ',
  method:'query',
  options:{
    query:{}
  }
}
API.SENDrequest({pack:fpack,route:'STORE'}).then(answr=>{
  console.log(answr);
});
