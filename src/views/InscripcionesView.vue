<template>
  <div>
    <div class="container" v-if="estudiante">
      <div class="header-section">
        <div class="title-group">
          <button @click="$router.push('/estudiantes')" class="btn-back">← Volver</button>
          <h3>Gestión de Matrículas</h3>
        </div>
        <div class="estudiante-badge">
          <span class="label">ID Estudiante:</span>
          <span class="value">{{ estudiante.id }}</span>
        </div>
      </div>

      <div class="info-card">
        <div class="info-item">
          <label>Nombre Completo:</label>
          <p>{{ estudiante.nombre }} {{ estudiante.apellido }}</p>
        </div>
        <div class="info-item">
          <label>Documento de Identidad:</label>
          <p>{{ estudiante.cedula }}</p>
        </div>
        <div class="info-item">
          <label>Correo Electrónico:</label>
          <p>{{ estudiante.email }}</p>
        </div>
      </div>

      <div class="action-section">
        <h4>Inscribir en Nuevo Curso</h4>
        <MatriculaForm 
          :cursosDisponibles="cursos" 
          @matricular="ejecutarMatricula" 
        />
      </div>

      <div class="list-section">
        <h4>Cursos Matriculados Actuales</h4>
        <InscripcionList 
          :inscripciones="inscripciones" 
          @cancelar="ejecutarCancelacion" 
        />
      </div>
    </div>
    
    <div v-else class="loading">
      Cargando datos del estudiante...
    </div>
    
    <!-- AlertaFlash -->
    <AlertaFlash
      :mostrar="alerta.mostrar"
      :mensaje="alerta.mensaje"
      :tipo="alerta.tipo"
      @ocultar="ocultarAlerta"
    />
  </div>
</template>

<script>
// ... (Tu lógica de script se mantiene exactamente igual)
import InscripcionList from '@/components/InscripcionList.vue';
import MatriculaForm from '@/components/MatriculaForm.vue';
import AlertaFlash from '@/components/AlertaFlash.vue';
import { consultarPorIdFachada } from '@/clients/EstudianteClient.js';
import { consultarCursosFachada } from '@/clients/CursoClient.js';
import { 
  buscarInscripcionesPorEstudianteFachada, 
  matricularFachada, 
  cancelarDesdeLinkFachada 
} from '@/clients/InscripcionClient.js';

export default {
  components: { InscripcionList, MatriculaForm, AlertaFlash },
  data() {
    return {
      estudiante: null,
      inscripciones: [],
      cursos: [],
      alerta: {
        mostrar: false,
        mensaje: '',
        tipo: 'success'
      }
    }
  },
  methods: {
    async cargarTodo() {
      const idEst = this.$route.params.id;
      // Comentario arriba de la línea
      // Carga paralela de recursos para mejorar la velocidad
      [this.estudiante, this.inscripciones, this.cursos] = await Promise.all([
        consultarPorIdFachada(idEst),
        buscarInscripcionesPorEstudianteFachada(idEst),
        consultarCursosFachada()
      ]);
    },
    async ejecutarMatricula(cursoId) {
      try {
        await matricularFachada(this.estudiante.id, cursoId);
        this.mostrarAlerta("¡Matriculación exitosa!", "success");
        await this.cargarTodo();
      } catch (e) {
        this.mostrarAlerta("Error: Es posible que no haya cupos o ya estés inscrito.", "error");
      }
    },
    async ejecutarCancelacion(urlHateoas) {
      await cancelarDesdeLinkFachada(urlHateoas);
      await this.cargarTodo();
      this.mostrarAlerta("Matrícula cancelada correctamente", "success");
    },

    mostrarAlerta(mensaje, tipo = 'success') {
      this.alerta.mostrar = true;
      this.alerta.mensaje = mensaje;
      this.alerta.tipo = tipo;
    },

    ocultarAlerta() {
      this.alerta.mostrar = false;
    }
  },
  mounted() {
    this.cargarTodo();
  }
}
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

/* Comentario arriba de la línea */
/* Estilo para el encabezado con navegación */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-back {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}

/* Comentario arriba de la línea */
/* Tarjeta de información destacada */
.info-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 30px;
}

.info-item label {
  display: block;
  font-size: 0.8rem;
  color: #7f8c8d;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.info-item p {
  margin: 0;
  font-weight: bold;
  color: #2c3e50;
}

.action-section, .list-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #eee;
}

h4 {
  margin-top: 0;
  color: #3498db;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 50px;
  font-style: italic;
  color: #7f8c8d;
}
</style>