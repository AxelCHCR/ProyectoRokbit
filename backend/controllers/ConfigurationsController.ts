import axios from "axios";

class ConfigurationsController {
  async create(route: string, data: any) {
    try {
      const response = await axios.post(route, data);
      if (response && response.data) {
        console.log("Informacion creada");
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

  async get(route: string, email: any) {
    try {
      const response = await axios.get(route, email);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }
  async update(route: string, data: any) {
    try {
      console.log("data", data);
      const response = await axios.put(route, data);
      console.log("Informacion actualizada");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }
}

export default new ConfigurationsController();
