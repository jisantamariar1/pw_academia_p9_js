<template>
  <div>
    <div class="container">

      <!-- Encabezado alineado -->
      <div class="header-section">
        <h2>Reporte de Cursos</h2>

        <button 
          @click="abrirNuevo" 
          class="btn-new">
          + Agregar Curso
        </button>
      </div>
      
      <CursoForm 
        v-if="mostrarForm" 
        :cursoEdit="cursoSeleccionado" 
        @actualizado="refrescar" 
        @cancelar="cerrar" 
      />

      <CursoList 
        :cursos="listaCursos" 
        @editar="prepararEdicion" 
        @eliminar="borrar" 
      />
    </div>
  </div>
</template>

<script>
import CursoList from '@/components/CursoList.vue';
import CursoForm from '@/components/CursoForm.vue';
import { consultarCursosFachada, borrarCursoFachada } from '@/clients/CursoClient.js';

export default {
  components: { CursoList, CursoForm },

  data() {
    return {
      listaCursos: [],
      mostrarForm: false,
      cursoSeleccionado: null
    }
  },

  methods: {

    async cargar() {
      try {
        this.listaCursos = await consultarCursosFachada();
      } catch (e) {
        console.error("Error al cargar cursos", e);
      }
    },

    abrirNuevo() {
      this.cursoSeleccionado = null;
      this.mostrarForm = true;
    },

    prepararEdicion(curso) {
      this.cursoSeleccionado = curso;
      this.mostrarForm = true;
    },

    async borrar(id) {
      if (confirm("¿Seguro que desea eliminar este curso?")) {
        await borrarCursoFachada(id);
        await this.cargar();
      }
    },

    refrescar() {
      this.cerrar();
      this.cargar();
    },

    cerrar() {
      this.mostrarForm = false;
      this.cursoSeleccionado = null;
    }
  },

  mounted() { 
    this.cargar(); 
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Mismo diseño que Estudiantes para coherencia visual */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

h2 {
  color: #2c3e50;
  margin: 0;
}

/* Botón consistente con el sistema */
.btn-new {
  background-color: #2c3e50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.btn-new:hover {
  background-color: #34495e;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn-new:active {
  transform: translateY(0);
}
</style>
