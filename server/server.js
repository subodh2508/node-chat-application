const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
// import http from 'http';
// import express from 'express';
// import socketIO from 'socket.io';

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
    socket.on('createMessege', (createMessegeData) => {
        // console.log('createMessegeData: ', createMessegeData);
        io.emit('newMessege', {
            from: createMessegeData.from,
            text: createMessegeData.text,
            createdAt: new Date().toString()
        });
    });
    socket.on('disconnect', () => {
        console.log('User Disconnected...!!!');
    });
});
app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is up on ${port}`));