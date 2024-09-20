import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "ReporteEcomonedas";

class ReportesService {

  ///////////////////
  getAll(){
    return axios.get(BASE_URL);
  }
  ///////////////////
}
export default new ReportesService();