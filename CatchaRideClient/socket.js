const io = require("socket.io")({
  transports: ["websocket"]
})

let sequenceNumberByClient = new Map();
io.attach(4571);

io.sockets.on("connection", function(socket) {
  sequenceNumberByClient.set(socket, 1);
  console.log("Client has joined: " + socket.id);
  socket.emit("Connection success");

  socket.on("test", function() {
    socket.emit("Accepted");
  });

  socket.on("sendinfotoserver", function(msg) {
    console.log("message from unity: " + msg);
  });

  socket.emit("sendinfotounity", {
    name: "smth",
    id: "smth"
  });

    socket.on("disconnect", () => {
      sequenceNumberByClient.delete(socket);
      console.info(`Client has left: ` +socket.id);
    });

  socket.on("availableclients", () => {
  var db = require("./db");
  var Offer = db.Mongoose.model("offer", db.OfferSchema, "offer");
  var offers = Offer.find({})
    .lean()
    .exec(function(e, docs) {
      if (docs) {
        docs = docs.map(function(obj) {
          return {
            id: obj._id,
            clientName: obj.clientName            
          };
        });
      }
        
      socket.emit("returnavailableclients", {
        clients: docs,
      });
    });
    })

});

function getDistanceFromLatLonInKm(latitude1,longitude1,latitude2,longitude2) {
  var p = 0.017453292519943295;    //This is  Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((latitude2 - latitude1) * p)/2 + 
          c(latitude1 * p) * c(latitude2 * p) * 
          (1 - c((longitude2 - longitude1) * p))/2;
  var R = 6371; //  Earth distance in km so it will return the distance in km
  var dist = 2 * R * Math.asin(Math.sqrt(a)); 
  return dist;
}

// from client to status did he accept or not

// one from driver says accepted or not

// one client to server that is saying coordinates user info

// driver to server gives driver info 

// driver to client name and distance
//driver server
// server client
// device id from socket