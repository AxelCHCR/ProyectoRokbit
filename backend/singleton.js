const mongoose = require("mongoose");
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
        mongoose.connect("mongodb+srv://axelchavesr:tGfpOZBhreznmEQU@cluster0.jqlfuzl.mongodb.net/?retryWrites=true&w=majority")
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));
    }
    disconnect(){
        mongoose.connection.close()
        .then(() => console.log("MongoDB disconnected"));

    }
}
module.exports = Database;