const mongoose = require('mongoose');

const student = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    topics: {
        type: [{
            _id: false,
            topic: {
                type: String,
                require: true,
                trim: true
            },
            summary: {
                type: String,
                require: true,
                trim: true
            }
        }]
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', student);