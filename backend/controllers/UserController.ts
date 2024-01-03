import axios from "axios";
class UserController {
  async register(route: string, data: any) {
    try {
      const response = await axios.post(route, data);
      console.log(response);
      if (response && response.status === 200) {
        console.log("Éxito en el registro:", response.data);
        return response.data;
      } else {
        console.log("El registro no fue exitoso. Respuesta vacía o estado incorrecto.");
        return null;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.log("El email ya existe en la base de datos");
        return null;
      } else {
        console.log("Error durante el registro:", error);
        // Manejar otros errores que no sean específicos de un email existente
        throw error;
      }
    }
  }

  async get(route: string, email: any) {
    try {
      const response = await axios.get(route, email);
      if (response && response.data) {
        console.log("Informacion obtenida");
        return response.data;
      } else {
        console.log("No hay informacion");
        return null;
      }
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async update(route: string, data: any) {
    try {
      const response = await axios.put(route, data);
      console.log("Informacion del perfil actualizada");
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async getAvailable(route: string, email: any) {
    try {
      const response = await axios.get(route, email);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async getNotified(route: string, email: any) {
    try {
      const response = await axios.get(route, email);
      console.log("Notificaciones obtenidas");
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async updateConfiguration(route: string, data: any) {
    try {
      const response = await axios.put(route, data);
      console.log("Disponibilidad actualizada");
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }
}
export default new UserController();
