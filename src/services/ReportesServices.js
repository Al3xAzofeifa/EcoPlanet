import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "Reportes";

class ReportesService {

  ///////////////////
  getAll(){
    return axios.get(BASE_URL);
  }
  ///////////////////

  getCantCanjesMesActual(reporte) {
    return axios.get(BASE_URL + "/" + "getCantCanjesMesActual" + "/" + reporte);
  }

  getCantCanjesXmaterialAnnioActual(reporte) {
    return axios.get(BASE_URL + "/" + "getCantCanjesXmaterialAnnioActual" + "/" + reporte);
  }

  getTotalGenerado(reporte) {
    return axios.get(BASE_URL + "/" + "getTotalGenerado" + "/" + reporte);
  }

  getTotalCanjesMesActual(reporte) {
    return axios.get(BASE_URL + "/" + "getTotalCanjesMesActual" + "/" + reporte);
  }

  getTotalMonedasXCentro(reporte) {
    return axios.get(BASE_URL + "/" + "getTotalMonedasXCentro" + "/" + reporte);
  }
}
export default new ReportesService();