// load the things we need
var mongoose = require('mongoose');
var FriendRequest = new Schema({
from: {
    type: int,
    required: true
},
to: {
    type: int,
    required: true
},
status: 
    type: int,
    required: true 
});

module.exports = mongoose.model('FriendRequest', FriendRequest);