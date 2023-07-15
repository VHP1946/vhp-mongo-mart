const {Core}=require('vhp-api');
let API = new Core({
    auth:{
        user:"VOGCH", 
        pswrd:"vogel123"
    },
    host:'http://localhost:8080/',
    sync:false, 
    dev:{comments:true}
});

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

API.SENDrequest({pack:fpack}).then(answer=>{
    console.log(answer)
});