import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "provincia";

class ProvinciaService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/Material
  getProvincias() {
    return axios.get(BASE_URL);
  }



}
export default new ProvinciaService();