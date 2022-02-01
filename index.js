require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const path = require('path');
const socketIo = require('socket.io');
const app = express();
const mongoose = require('mongoose');
const Messages = require('./models/Messages');

mongoose.connect(process.env.MONGO_CONNECTION_URL)

app.use('/', express.static(path.join(__dirname, 'public')));

const server = app.listen(PORT, () => {
    console.log("running server");
});


const messages = [];

const io = socketIo(server);

io.on('connection', async (socket) => {

    console.log("new connection");

    socket.emit('last_messages', messages);

    socket.on('new_message', (data) => {

        messages.push(data);
        io.emit('last_messages', messages);

    });

});