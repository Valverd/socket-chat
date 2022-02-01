const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({
    msg: Array
});

const Messages = mongoose.model("Messages", messagesSchema);

module.exports = Messages;