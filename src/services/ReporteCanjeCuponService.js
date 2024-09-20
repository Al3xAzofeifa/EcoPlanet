import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "ReporteCanjeCupon";

class ReporteCanjeCupon {

  ///////////////////
  getAll(){
    return axios.get(BASE_URL);
  }
  ///////////////////
}
export default new ReporteCanjeCupon();