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

const io = socketIo(server);


Messages.find().then(data => {
    let newMsg = new Messages({ msg: [] });
    if (!data[0]) {
        newMsg.save()
    };
});


let messages = [];


io.on('connection', async (socket) => {

    Messages.find().then(data => {
        messages = data[0].msg;
        socket.emit('last_messages', messages);
    });

    socket.on('new_message', (data) => {

        messages.push(data);
        Messages.findOneAndUpdate({}, { msg: messages }).then(() => {
            io.emit('last_messages', messages);
        })
    });

});