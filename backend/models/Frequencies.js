const mongoose = require("mongoose");
const frequencySchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    frequency: {
        type: Number,
        required: false,
        default: 1,
    },
});
module.exports = mongoose.model("Frequencies", frequencySchema);