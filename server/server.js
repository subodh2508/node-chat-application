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
    socket.on('disconnect', () => {
        console.log('User Disconnected...!!!');
    });
});
app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is up on ${port}`));