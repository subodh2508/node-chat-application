import path from 'path';
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = socketIO(server);
app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is up on ${port}`));