import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "ProcesoCanjeo";

class ProcesoCanjeoService {
  //Usuario administrador
  crearCanjeo(Canjeo) {
    return axios.post(BASE_URL, Canjeo);
  }
}
export default new ProcesoCanjeoService();
