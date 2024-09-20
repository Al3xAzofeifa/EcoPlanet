import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "distrito";

class DistritoService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/Material
  getAllDistrito() {
    return axios.get(BASE_URL);
  }

  getDistritoByIdCanton(idCanton){
    return axios.get(BASE_URL + "/getDistritoByIdCanton/"+ idCanton); 
  }

}
export default new DistritoService();