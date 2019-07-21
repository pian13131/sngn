const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const Filter = require("bad-words");
const app = express();
const server = http.createServer(app); // express did this for u
const io = socketio(server); // this part should be done manully
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
const { generateMessage } = require("./utils/messages");
app.use(express.static(publicDirectoryPath));
let count = 0;
io.on("connection", socket => {
  socket.emit("countUpdated", count); // send events
  socket.on("increment", () => {
    count++;
    // socket.emit('countUpdated', count) // this emit only towards to one single connection
    io.emit("countUpdated", count); // broad cast, everyone get updated
    // io --> everyone
    // socket --> singleone
    // socket.broadcast --> everyone - itself
    // io.to.emit --> to everyone in perticular room
    // socket.broadcast.to --> to everyone - itself in perticular room
  });
  socket.on('join', ({username, room}) => {
    socket.join(room) // msg limited in the room
    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))
  })
  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Bad words!!!");
    }
    io.emit("message", generateMessage(message));
    callback("Yeah!!!"); // trigger cb mannuly, yeah will passed to client
  });

  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user left"));
  });

  socket.on("sendLocation", (coords, cb) => {
    io.emit(
      "locationMessage",
      `https://google.com/maps?q=${coords.latitude},${coords.longtitude}`
    ); // get loc in google map
    cb();
  });
}); // event name       varaible

// const now = new Date() // current time
// now.toString() // a long time string
// now.getDate() // 31
// now.getTime() // timestamp
server.listen(port, () => console.log(`App listening on port ${port}!`));
