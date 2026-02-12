import axios from 'axios'

const baseURL = "http://localhost:8081/academia/api/v1.0/inscripciones";

const matricular = async (estudianteId, cursoId) => {
    const token = localStorage.getItem('token')

    const url = `${baseURL}/matricular?estudianteId=${estudianteId}&cursoId=${cursoId}`;

    // El body va vacío porque uso query params
    const data = await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
    return data;
}

// Cancelar inscripción
const cancelar = async (id) => {
    const token = localStorage.getItem('token')
    const url = `${baseURL}/${id}/cancelar`;


    const data = await axios.put(url, {}, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
    return data;
}

// Cancelar usando el link HATEOAS que viene del backend
const cancelarPorUrl = async (urlCompleta) => {
    const token = localStorage.getItem('token')
    const data = await axios.put(urlCompleta, {}, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
    return data;
}

// Listar inscripciones de un estudiante
const buscarPorEstudiante = async (estudianteId) => {
    const token = localStorage.getItem('token')
    const url = `${baseURL}?estudianteId=${estudianteId}`;

    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
    return data;
}


// Fachadas

export const matricularFachada = async (estudianteId, cursoId) => {
    return await matricular(estudianteId, cursoId);
}

export const cancelarInscripcionFachada = async (id) => {
    return await cancelar(id);
}

// Cancelar con HATEOAS - le paso el href directo
export const cancelarDesdeLinkFachada = async (url) => {
    return await cancelarPorUrl(url);
}

export const buscarInscripcionesPorEstudianteFachada = async (estudianteId) => {
    return await buscarPorEstudiante(estudianteId);
}