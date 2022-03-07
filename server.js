const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socketio = require('socket.io');

dotenv.config({ path: './config.env' });
const app = require('./app');

const server = require('http').createServer(app);
const io = socketio(server);
global.io = io;

app.set('socketio', io);

io.on('connection', () => {
  console.log('a user is connected');
});

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

const DB = process.env.DATABASE;
mongoose.connect(DB, {}).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`Server up and running on port ${port}....`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection 💥shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
