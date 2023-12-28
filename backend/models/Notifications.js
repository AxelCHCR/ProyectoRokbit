const mongoose = require("mongoose");
const NotificationsSchema = mongoose.Schema({
    message: {
        type:String,
        required:true,
    },
    timeStamp:{
        type: String, 
        required: true,
    },
    meetingId:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("Notifications", NotificationsSchema);