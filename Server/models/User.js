const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true
    },
    requests: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users'
    },
    friendRequests: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users' 
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],

},
{timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);