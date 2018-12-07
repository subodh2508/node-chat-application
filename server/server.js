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
    // socket.emit('newMessege', {
    //     from: "jerry",
    //     text: "Hey, This is Jerry ",
    //     createdAt: 123
    // });
    socket.on('createMessege', (messege) => {
        // console.log('messege: ', messege);
        io.emit('newMessege', generateMessege(messege.from, messege.text));
        // io.emit('newMessege', {
        //     from: messege.from,
        //     text: messege.text,
        //     createdAt: new Date().toString()
        // });
    });

    // socket.emit('newMessege', {
    //     from: 'Admin',
    //     text: "Welcome to chat application",
    //     createdAt: new Date().toString()
    // });
    // socket.broadcast.emit('newMessege', {
    //     from: 'Admin',
    //     text: "New User Joined",
    //     createdAt: new Date().toString()
    // });
    socket.emit('newMessege', generateMessege('Admin', "Welcome to chat application"));
    socket.broadcast.emit('newMessege', generateMessege('Admin', "New User Joined"));
    socket.on('disconnect', () => {
        console.log('User Disconnected...!!!');
    });
});
app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is up on ${port}`));