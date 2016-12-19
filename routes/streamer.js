var io = require('socket.io')();
io.set('orgins','*:*');
io.on('connection', function(socket) {
  console.log("Server");
  io.emit('senderActivity', 'Send')
// socket.on('sender', function(msg) {
//   io.emit('senderActivity', msg);
// });
// socket.on('typing', function(msg) {
//   io.emit('typingEvent', msg);
// });
});
module.exports = io;
