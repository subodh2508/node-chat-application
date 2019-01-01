const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessege, generateLocationMessege} = require('./utils/messege');
const {isRealString} = require('./utils/validations');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
let users = new Users();

const io = socketIO(server);
io.on('connection', (socket) => {

    console.log('New user connected');
    socket.on('createLocationMessege', (coords, callback) => {
        const user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessege', generateLocationMessege(user.name, coords.latitude, coords.longitude));
        }
        callback();
    });

    socket.on('join', (param, callback) => {
        if(!isRealString(param.name) || !isRealString(param.room)){
            callback('Name and Room name are required');
        }

        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, param.name, param.room);
        // socket.leave(param.room); // to leave the room

        //io.emit - send messege to every connected user
        //io.to('room name').emit - send messege to every connected user in specific room
        //socket.broadcacte.emit - send messege to every connected user except to current user
        //socket.broadcacte.to('room name').emit - send messege to every connected user except to current user to specific roon
        //socket.emit - send messege to specific user
        io.to(param.room).emit('updateUserList', users.getUserList(param.room));
        socket.emit('newMessege', generateMessege('Admin', "Welcome to chat application"));
        socket.broadcast.to(param.room).emit('newMessege', generateMessege('Admin', `${param.name} has joined`));
        callback();
    });

    socket.on('createMessege', (messege, callback) => {
        const user = users.getUser(socket.id);
        if(user && isRealString(messege.text)){
            io.to(user.room).emit('newMessege', generateMessege(user.name, messege.text));
        }
        callback();
    });
    
    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessege', generateMessege('Admin', `${user.name} has left`));
        }
    });
});
app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is up on ${port}`));