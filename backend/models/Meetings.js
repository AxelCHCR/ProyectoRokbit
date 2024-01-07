const mongoose = require("mongoose");
const meetingsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    date:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    startTime:{
        type: String,
        required: true,
    },
    endTime:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: false,
        default: 'Pending',
        // 'Pending', 'Cancelled', 'Completed'
    },
    recurrence:{
        type: Boolean,
        required: true,
    },
    priority:{
        type: String,
        required: true,
    },
    owner:{
        type: String,
        required: true,
    },
    document:{
        type: String,
        required: false,
        default: 'No Document',
    }
});
module.exports = mongoose.model("Meetings", meetingsSchema);