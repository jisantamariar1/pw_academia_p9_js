<template>
  <nav class="navbar">
    <div class="brand">Academia Pro</div>
    <div class="menu">
      <router-link to="/estudiantes">Estudiantes</router-link> |
      <router-link to="/cursos">Cursos</router-link>
    </div>
    <div class="user-info">
      <span>Bienvenido, <b>{{ usuario }}</b></span>
      <button @click="logout" class="btn-logout">Salir</button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      usuario: localStorage.getItem('user') || 'Usuario'
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #2c3e50;
  color: white;
}
.menu a {
  color: #42b983;
  text-decoration: none;
  margin: 0 10px;
}
.btn-logout {
  margin-left: 15px;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>