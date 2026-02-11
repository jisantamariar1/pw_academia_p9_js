import axios from 'axios'

const baseURL = "http://localhost:8081/academia/api/v1.0/cursos";

const consultarTodos = async () => {
    const token = localStorage.getItem('token')
    const data = await axios.get(`${baseURL}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
    return data;
}

const consultarPorId = async (id) => {
    const token = localStorage.getItem('token')
    const data = await axios.get(`${baseURL}/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
    return data
}

const guardar = async (body) => {
    const token = localStorage.getItem('token')
    const data = await axios.post(`${baseURL}`, body, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
    return data;
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

// Comentario arriba de la línea
// Fachadas para ser utilizadas en los componentes de Vue
export const consultarCursosFachada = async () => {
    return await consultarTodos();
}

export const consultarCursoPorIdFachada = async (id) => {
    return await consultarPorId(id);
}

export const guardarCursoFachada = async (body) => {
    return await guardar(body);
}

export const actualizarCursoFachada = async (id, body) => {
    return await actualizar(id, body);
}

export const actualizarCursoParcialFachada = async (id, body) => {
    return await actualizarParcial(id, body);
}

export const borrarCursoFachada = async (id) => {
    return await borrar(id);
}