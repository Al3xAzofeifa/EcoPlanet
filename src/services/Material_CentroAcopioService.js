import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "material_centroAcopio";
class MaterialService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/Material
  getMateriales() {
    return axios.get(BASE_URL);
  }
  //localhost:81/api/Material/2
  getMaterialByIdCentroAcopio(idCentroAcopio) {
    return axios.get(BASE_URL + "/materiales/" + idCentroAcopio);
  }
}
export default new MaterialService();
