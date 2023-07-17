const {Core}=require('vhp-api');
let API = new Core({
    auth:{
        user:"VOGCH", 
        pswrd:"vogel123"
    },
    host:'http://18.191.223.80/',
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
    query:{}
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
  db:'Company',
  collect:'Employee',
  method:'INSERT',
  options:{
    docs: {
      empID: '07',
      fName: 'Test',
      lName: 'Guy'
    }
  }
}

//API.SENDrequest({pack:fpack,route:'STORE'}).then(answer=>{
//    console.log(answer)
//});

let quote = {
  collect:'apps',
  db:'mquotes',
  store:'RRQ',
  method:'query',
  options:{
    query:{}
  }
}
oldMart.SENDrequest({pack:quote,route:'STORE',request:'MART'}).then(answr=>{
  console.log(answr.body.result);
});
