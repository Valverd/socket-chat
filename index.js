require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const path = require('path');
const socketIo = require('socket.io');
const app = express();
const mongoose = require('mongoose');
const Messages = require('./models/Messages');

mongoose.connect(process.env.MONGO_CONNECTION_URL)

Messages.find().then(data => {
    let newMsg = new Messages({ msg: [] });
    if (!data[0]) {
        newMsg.save()
    };
});

app.use('/', express.static(path.join(__dirname, 'public')));

const server = app.listen(PORT, () => {
    console.log("running server");
});



let messages = [];

const io = socketIo(server);

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