const mongoose = require('mongoose');

// Create Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

//module.exports = mongoose.model("User", UserSchema);
module.exports = mongoose.model('User', UserSchema);