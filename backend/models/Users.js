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
    password:{
        type: String,
        required: true,
    },
    age:{
        type: String,
        required: false,
    },
    role: {
        type: String, 
        required: true,
    },
    allowNotifications:{
        type: Boolean,
        required: false
    },

});
module.exports = mongoose.model("Users", usersSchema);