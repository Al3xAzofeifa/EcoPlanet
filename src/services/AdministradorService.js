import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "administrador";
class UsuarioService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getAdministradores() {
    return axios.get(BASE_URL);
  }
  //localhost:81/api/movie/2
  getUsuarioById(UsuarioId) {
    return axios.get(BASE_URL + "/" + UsuarioId);
  }

  getCurrentAdminAndFrees(idCentro) {
    return axios.get(BASE_URL + "/" + "admin" + "/" + idCentro);
  }

  getAdminsCentro(tipoUsuario) {
    return axios.get(BASE_URL + "/adminsCentros/" + tipoUsuario);
  }

  getAdminCentroById(adminId) {
    return axios.get(BASE_URL + "/getAdminCentro/" + adminId);
  }

  createAdminCentro(admin) {
    return axios.post(BASE_URL, admin);
  }

  updateAdminCentro(admin) {
    return axios.put(BASE_URL, admin);
  }
}
export default new UsuarioService();
