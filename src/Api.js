import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000/");

let receive
let from
let getRead

function setReceive(rec){
  receive = rec
}

function setGetRead(gr){
  getRead = gr
}

function setFrom(f){
  from = f
}

function connect() {
  // listen for any messages coming through
  // of type 'chat' and then trigger the
  // callback function with said message
  // socket.emit('connection')

  let id
  if(window.localStorage.token && window.localStorage.name){
    id=window.localStorage.id
  }else if(window.sessionStorage.token && window.sessionStorage.name){
    id=window.sessionStorage.id
  }

  console.log(id)

  socket.emit('go-online', id)

  socket.on(id, (from_id, message) => {
    // console.log the message for posterity
    // console.log(from_id+": "+message);
    if(receive!=null){
      receive(message)
      
    }
    if(from!=null){
      from(from_id)
    }

    // trigger the callback passed in when
    // our App component calls connect
    // cb(message);
    
  });

  socket.on('read-'+id, ()=>{
    getRead()
  })
}

export { connect, socket, setReceive, setFrom, setGetRead };