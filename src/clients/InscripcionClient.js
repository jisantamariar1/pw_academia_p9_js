import axios from 'axios'

const baseURL = "http://localhost:8081/academia/api/v1.0/inscripciones";

// Acción: Matricular (POST con Query Params)
const matricular = async (estudianteId, cursoId) => {
    const token = localStorage.getItem('token')
    
    // Construimos la URL con los parámetros query tal como lo espera:
    // @QueryParam("estudianteId") y @QueryParam("cursoId")
    const url = `${baseURL}/matricular?estudianteId=${estudianteId}&cursoId=${cursoId}`;
    
    // IMPORTANTE: En axios.post, el segundo argumento es el body.
    // Como tu backend no espera un JSON en el body, enviamos un objeto vacío {}.
    const data = await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
    return data;
}

// Acción: Cancelar (PUT con Path Param)
const cancelar = async (id) => {
    const token = localStorage.getItem('token')
    
    // Construimos la ruta tal como está en el Resource: @Path("/{id}/cancelar")
    const url = `${baseURL}/${id}/cancelar`;
    
    // Usamos PUT y body vacío
    const data = await axios.put(url, {}, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
    return data;
}

// Acción: HATEOAS puro (Opcional pero recomendado para Nivel 3)
// Este método permite cancelar usando directamente el link que viene en el JSON
// sin tener que "adivinar" o construir la URL manualmente.
const cancelarPorUrl = async (urlCompleta) => {
    const token = localStorage.getItem('token')
    const data = await axios.put(urlCompleta, {}, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
    return data;
}

// Acción: Listar por estudiante (GET con Query Param)
const buscarPorEstudiante = async (estudianteId) => {
    const token = localStorage.getItem('token')
    
    // Construimos la URL: @QueryParam("estudianteId")
    const url = `${baseURL}?estudianteId=${estudianteId}`;
    
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
    return data;
}


// --- FACHADAS ---

export const matricularFachada = async (estudianteId, cursoId) => {
    return await matricular(estudianteId, cursoId);
}

export const cancelarInscripcionFachada = async (id) => {
    return await cancelar(id);
}

// Fachada extra para HATEOAS 
// Le pasas directamente el 'href' del link 'cancelar-inscripcion'
export const cancelarDesdeLinkFachada = async (url) => {
    return await cancelarPorUrl(url);
}

export const buscarInscripcionesPorEstudianteFachada = async (estudianteId) => {
    return await buscarPorEstudiante(estudianteId);
}