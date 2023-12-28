const mongoose = require("mongoose");
const groupsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type: String, 
        required: true,
    },
    admin:{
        type: String,
        required: true,
    },
    collaborators:{
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("Groups", groupsSchema);