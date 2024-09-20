import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "usuario";
class UsuarioService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie
  getUsuarios() {
    return axios.get(BASE_URL);
  }
  //localhost:81/api/movie/2
  getUsuarioById(UsuarioId) {
    return axios.get(BASE_URL + "/" + UsuarioId);
  }

  getCurrentAdminAndFrees(idCentro) {
    return axios.get(BASE_URL + "/" + "admin" + "/" + idCentro);
  }

  createUser(Usuario) {
    return axios.post(BASE_URL, Usuario);
  }

  getClientes(tipoUserId) {
    return axios.get(BASE_URL + "/" + "clientes" + "/" + tipoUserId);
  }

  updateUser(Usuario) {
    return axios.put(BASE_URL, Usuario);
  }

  loginUser(User) {
    return axios.post(BASE_URL + "/login/", User);
  }

  getAdminsCentro(tipoUsuario) {
    return axios.get(BASE_URL + "/adminsCentros/" + tipoUsuario);
  }
}
export default new UsuarioService();
