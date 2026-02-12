import axios from 'axios'
const baseURL = 'http://localhost:8081/academia/api/v1.0/estudiantes';

const consultarTodos = async () => {
    const token = localStorage.getItem('token')
    const data = await axios.get(`${baseURL}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
    return data
}

const consultarPorId = async (id) => {
    const token = localStorage.getItem('token')
    const data = await axios.get(`${baseURL}/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
    return data
}

const guardar = async (body) => {
    const token = localStorage.getItem('token')
    const data = await axios.post(`${baseURL}`, body, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
    return data
}


const actualizar = async (id, body) => {
    const token = localStorage.getItem('token')
    const data = await axios.put(`${baseURL}/${id}`, body, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
    return data
}

const actualizarParcial = async (id, body) => {
    const token = localStorage.getItem('token')
    const data = await axios.patch(`${baseURL}/${id}`, body, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
    return data
}

const borrar = async (id) => {
    const token = localStorage.getItem('token')
    const data = await axios.delete(`${baseURL}/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
    return data
}

// Fachadas
export const consultarTodosFachada = async () => await consultarTodos();
export const consultarPorIdFachada = async (id) => await consultarPorId(id);
export const guardarFachada = async (body) => await guardar(body);
export const actualizarFachada = async (id, body) => await actualizar(id, body);
export const actualizarParcialFachada = async (id, body) => await actualizarParcial(id, body);
export const borrarFachada = async (id) => await borrar(id);