const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
class Database{
    static instance;
    constructor(){

    }
    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
    connect(){
        mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));
    }
    disconnect(){
        mongoose.connection.close()
        .then(() => console.log("MongoDB disconnected"));

    }
}
module.exports = Database;