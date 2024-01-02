import axios from "axios";
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
      try {
        const response = await axios.post(route, data);
        if (response && response.data) {
          console.log('Éxito en el registro:', response.data);
          return response.data;
        } else {
          console.log('El registro no fue exitoso. Respuesta vacía.');
          return null;
        }
      } catch (error) {
        console.log('Error durante el registro:', error);
        throw error;
      }
    }

    async get(route: string, email: any) {
      try {
        const response = await axios.get(route, email);
        if (response && response.data) {
          console.log('Get info:', response.data);
          return response.data;
        } else {
          console.log('No hay informacion');
          return null;
        }
      } catch (error) {
        console.log('Error:', error);
        throw error;
      }
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
