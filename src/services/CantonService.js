import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "canton";

class CantonService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/Material
  getAllCanton() {
    return axios.get(BASE_URL);
  }

  getCantonByIdProvincia(idProvincia){
    return axios.get(BASE_URL + "/getCantonByIdProvincia/"+ idProvincia); 
  }

}
export default new CantonService();