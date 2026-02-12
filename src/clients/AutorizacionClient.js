import axios from 'axios'

const obtenerToken = async (user, password) => {
    
   
    const data = await axios.get(`http://localhost:8082/auth/api/v1.0/auth/token?user=${user}&password=${password}`).then(r => r.data)
    return data
}

export const obtenerTokenFachada = async (user, password) => {
    return await obtenerToken(user, password)
}