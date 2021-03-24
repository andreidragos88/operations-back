const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operationSchema = new Schema(
    {
        result: {
            type: String,
            required: true
        },
        command: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Operation', operationSchema);
