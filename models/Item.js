const mongoose = require('mongoose');

// Create Schema
const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

//module.exports = mongoose.model("User", UserSchema);
module.exports = mongoose.model('Item', ItemSchema);