import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "TipoCupon";

class TipoCuponService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/Material
  
  getAll() {
    return axios.get(BASE_URL);
  }

  getById(id){
    return axios.get(BASE_URL + "/" + id); 
  }


}
export default new TipoCuponService();