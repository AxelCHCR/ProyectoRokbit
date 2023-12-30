import axios from "axios";
import { any } from "zod";
class UserController {
    /*public name: string;
    public lastName: string;
    public email: string;
    public password: string;
    public age: string;
    public role: string;*/
    //Make the constructor method
    /*constructor(userInfo: any) {
        this.name = userInfo.nombre;
        this.lastName = userInfo.apellido;
        this.email = userInfo.correo;
        this.password = userInfo.contrasena;
        this.age = userInfo.edad;
        this.role = userInfo.rol;
    }*/
    async register(route: string, data: any) {
        const response = await axios.post(route, data)
        .then((res: any) => {console.log("exitoso: ", res)})
        .catch((error) => {console.log("error: ", error)});  
        return response;
    }
    /*public getData() {
        console.log(
            this.name,
            this.lastName,
            this.email,
            this.password,
            this.age,
            this.role
        )
        return {
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            age: this.age,
            role: this.role
        }
    }*/
}
export default new UserController();
