import express from 'express';
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
console.log('publicPath', publicPath);
app.use(express.static(publicPath));
app.listen(port, () => console.log(`Server is up on ${port}`));