const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessege} = require('./utils/messege');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = socketIO(server);
io.on('connection', (socket) => {

    console.log('New user connected');
    socket.on('createMessege', (messege, callback) => {
        console.log('createMessege: ', messege);
        io.emit('newMessege', generateMessege(messege.from, messege.text));
        callback('This is from server');
    });
    socket.emit('newMessege', generateMessege('Admin', "Welcome to chat application"));
    socket.broadcast.emit('newMessege', generateMessege('Admin', "New User Joined"));
    socket.on('disconnect', () => {
        console.log('User Disconnected...!!!');
    });
});
app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is up on ${port}`));