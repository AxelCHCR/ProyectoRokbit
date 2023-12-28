const mongoose = require("mongoose");
const { type } = require("os");
const meetingsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type: String, 
        required: true,
    },
    date:{
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
        required: true,
    },
    priority:{
        type: String,
        required: true,
    },
    document:{
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("Meetings", meetingsSchema);