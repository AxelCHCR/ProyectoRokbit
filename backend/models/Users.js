const mongoose = require("mongoose");
const usersSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    lastName:{
        type: String, 
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    birthDate:{
        type: String,
        required: true,
    },
    role: {
        type: String, 
        required: true,
    },
    allowNotifications:{
        type: Boolean,
        required: false,
        default: false
    },
    allowAvailability:{
        type: Boolean,
        required: false,
        default: false
    },

});
module.exports = mongoose.model("Users", usersSchema);