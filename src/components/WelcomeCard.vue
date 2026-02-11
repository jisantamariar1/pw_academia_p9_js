<template>
  <div class="welcome-container">
    <div class="hero-section">
      <h1>SGA - Academia Pro</h1>
      <p>Sistema de Gestión Académica con soporte HATEOAS</p>
    </div>

    <div class="dashboard-grid">
      <div class="card" @click="$router.push('/estudiantes')">
        <div class="card-icon">👥</div>
        <h3>Estudiantes</h3>
        <p>Gestionar registros, editar datos y ver reportes.</p>
        <button class="btn-go">Ir a Estudiantes</button>
      </div>

      <div class="card" @click="$router.push('/cursos')">
        <div class="card-icon">📚</div>
        <h3>Cursos</h3>
        <p>Administrar catálogo de materias y control de cupos.</p>
        <button class="btn-go">Ir a Cursos</button>
      </div>

      <div class="card info-card">
        <div class="card-icon">⚙️</div>
        <h3>Estado del Sistema</h3>
        <p>Token JWT: <span class="status">Activo</span></p>
        <p>API: <span class="status">Conectada</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-container { padding: 40px 20px; max-width: 1000px; margin: auto; }
.hero-section { text-align: center; margin-bottom: 50px; }
.hero-section h1 { font-size: 2.5rem; color: #2c3e50; margin-bottom: 10px; }

.dashboard-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 20px; 
}

.card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
  border: 1px solid #eee;
}

.card:hover { transform: translateY(-5px); }
.card-icon { font-size: 3rem; margin-bottom: 15px; }
.status { color: #27ae60; font-weight: bold; }
.btn-go { 
  margin-top: 15px; 
  background: #3498db; 
  color: white; 
  border: none; 
  padding: 8px 16px; 
  border-radius: 5px; 
  cursor: pointer;
}
.info-card { cursor: default; background: #f8f9fa; }
.info-card:hover { transform: none; }
</style>