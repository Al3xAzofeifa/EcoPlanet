import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "ReporteEcomonedasGeneral";

class ReporteEcomonedasGeneral {

  ///////////////////
  getAll(){
    return axios.get(BASE_URL);
  }
  ///////////////////
}
export default new ReporteEcomonedasGeneral();