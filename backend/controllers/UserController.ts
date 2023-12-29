import axios from "axios";
class UserController{
    private name: string;
    private lastName: string;
    private email: string;
    private password: string;
    private role: string;
    //Make the constructor method
    constructor(userInfo: object){
        this.name = userInfo.name;
        this.lastName = userInfo.lastName;
        this.email = userInfo.email;
        this.password = userInfo.password;
        this.role = userInfo.role;  
    }
    private login(){
        
    }
}