import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "BilleteraVirtual";
class UsuarioService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/api/movie

  getBilleteraVirtualByUsuario(usuario) {
    return axios.get(BASE_URL + "/" + usuario);
  }
}

export default new UsuarioService();
