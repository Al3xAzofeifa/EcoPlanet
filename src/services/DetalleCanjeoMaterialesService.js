import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "DetalleCanjeoMateriales";
class DetalleCanjeoMaterialesService {
  //Definición para Llamar al API y obtener el listado de películas

  getDetalleCanjeosMateriales() {
    return axios.get(BASE_URL);
  }
  //localhost:81/api/movie
  getDetalleCanjeoMaterialesByIdCanjeo(id) {
    return axios.get(BASE_URL + "/" + id);
  }

}
export default new DetalleCanjeoMaterialesService();