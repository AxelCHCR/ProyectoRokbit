const mongoose = require("mongoose");
const { type } = require("os");
const FeebackSchema = mongoose.Schema({
    meetingId: {
        type:String,
        required:true,
    },
    userId:{
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
});
module.exports = mongoose.model("Feedbacks", FeebackSchema);
