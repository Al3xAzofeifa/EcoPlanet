import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "Cupones";

class CuponService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/Material

  getAll() {
    return axios.get(BASE_URL);
  }

  getById(id) {
    return axios.get(BASE_URL + "/" + id);
  }

  create(Cupon) {
    return axios.post(BASE_URL, Cupon);
  }

  update(Cupon) {
    return axios.put(BASE_URL, Cupon);
  }
}
export default new CuponService();
