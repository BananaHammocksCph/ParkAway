var mongo = require('./mongo/db');


function handleRequest(msg, callback) {
  console.log("Handling request");
  switch (msg.type) {
    case "direction":
      direction(msg, callback);
      break;
    case "park":
      park(msg, callback);
  }
}


  
exports.handleRequest=handleRequest;