const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socketio = require('socket.io');

dotenv.config({ path: './config.env' });
const app = require('./app');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', () => {
  console.log('a user is connected');
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
