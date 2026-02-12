<template>
  <div class="login-container">
    <div class="intro">
      <h1>Academia de Cursos</h1>
      <p>Gestión de Matrículas, Cursos y Estudiantes</p>
    </div>
    
    <LoginForm @login-exitoso="irAlHome" />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
  methods: {
    irAlHome() {
      // Redirigir al usuario al Dashboard principal
      this.$router.push('/estudiantes');
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
}
.intro {
  text-align: center;
  margin-bottom: 2rem;
}
h1 {
  color: #2c3e50;
  margin: 0;
}
</style>