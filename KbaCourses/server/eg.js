//without using express

// const http = require('http');

// // Create an HTTP server
// const server = http.createServer((req, res) => {
//     // You can add routing logic here if needed
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Server is running');
// });

// // Start the server and listen on port 8000
// server.listen(8000, () => {
//     console.log('Server is listening at 8000');
// });


//.env

import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Load variables from .env file

const app = express();

// Use the PORT variable from .env
const PORT = process.env.PORT 

app.listen(PORT, function () {
    console.log(`Server is listening at ${PORT}`);
});
