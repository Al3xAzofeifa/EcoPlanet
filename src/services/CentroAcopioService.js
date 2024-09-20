import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "centroAcopio";


class CentroAcopioService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getCentrosAcopio() {
    return axios.get(BASE_URL);
  }
  //localhost:81/api/movie/2
  getCentroAcopioById(CentroAcopioId) {
    return axios.get(BASE_URL + "/" + CentroAcopioId);
  }

  getCentroFormById(Centro) {
    return axios.get(BASE_URL + "/getForm/" + Centro);
  }

  getProcesoCanjeoAdmin(Centro) {
    return axios.get(BASE_URL + "/getProcesoCanjeo/" + Centro);
  }

  crearCentro(Centro) {
    return axios.post(BASE_URL, Centro);
  }

  updateCentro(Centro) {
    return axios.put(BASE_URL, Centro);
  }
}
export default new CentroAcopioService();
