<template>
  <div class="login-card">
    <h3>Iniciar Sesión</h3>
    
    <form @submit.prevent="iniciarSesion">
      <div class="form-group">
        <label>Usuario:</label>
        <input 
          type="text" 
          v-model="usuario" 
          placeholder="Ej: Juan"
          required
        />
      </div>

      <div class="form-group">
        <label>Contraseña:</label>
        <input 
          type="password" 
          v-model="password" 
          placeholder="************"
          required
        />
      </div>

      <div v-if="error" class="error-msg">
        {{ error }}
      </div>

      <button type="submit" :disabled="cargando">
        {{ cargando ? 'Ingresando...' : 'Ingresar' }}
      </button>
    </form>
  </div>
</template>

<script>
import { obtenerTokenFachada } from '@/clients/AutorizacionClient';

export default {
  name: 'LoginForm',
  data() {
    return {
      usuario: '',
      password: '',
      error: null,
      cargando: false
    }
  },
  methods: {
    async iniciarSesion() {
      this.cargando = true;
      this.error = null;

      try {
        // 1. Llamamos al backend 
        const token = await obtenerTokenFachada(this.usuario, this.password);
        
        if (token) {
          // 2. Guardamos el token y el nombre de usuario en el navegador
          localStorage.setItem('token', token.accessToken);
          localStorage.setItem('user', this.usuario);
          
          // 3. Emitimos un evento para avisar que ya entramos
          this.$emit('login-exitoso');
          
        } else {
          this.error = "Credenciales incorrectas (No llegó el token)";
          this.$emit('mostrar-alerta', 'Credenciales incorrectas', 'error');
        }

      } catch (e) {
        console.error(e);
        this.error = "Error al conectar con el servidor o credenciales inválidas.";
        this.$emit('mostrar-alerta', 'Error al conectar con el servidor o credenciales inválidas', 'error');
      } finally {
        this.cargando = false;
      }
    }
  }
}
</script>

<style scoped>
/* Estilos básicos para que se vea decente sin instalar Bootstrap aún */
.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}
.form-group {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983; /* Verde Vue */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background-color: #3aa876;
}
button:disabled {
  background-color: #ccc;
}
.error-msg {
  color: red;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
</style>