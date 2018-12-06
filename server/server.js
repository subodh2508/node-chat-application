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
    socket.emit('newEmail', {
        from: "example@example.com",
        text: "Hey, This is new mail",
        createdAt: 123
    });
    socket.on('createEmail', (createEmailData) => {
        console.log('createEmailDatex: ', createEmailData);
    });
    socket.on('disconnect', () => {
        console.log('User Disconnected...!!!');
    });
});
app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is up on ${port}`));