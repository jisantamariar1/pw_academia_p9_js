<template>
  <div>
    
    <div class="container" v-if="estudiante">
      <h3>Gestión de Matrículas</h3>
      <div class="estudiante-info">
        <p><b>Estudiante:</b> {{ estudiante.nombre }} {{ estudiante.apellido }}</p>
        <p><b>Cédula:</b> {{ estudiante.cedula }}</p>
      </div>

      <MatriculaForm 
        :cursosDisponibles="cursos" 
        @matricular="ejecutarMatricula" 
      />

      <hr />

      <InscripcionList 
        :inscripciones="inscripciones" 
        @cancelar="ejecutarCancelacion" 
      />
    </div>
  </div>
</template>

<script>

import InscripcionList from '@/components/InscripcionList.vue';
import MatriculaForm from '@/components/MatriculaForm.vue';

import { consultarPorIdFachada } from '@/clients/EstudianteClient.js';
import { consultarCursosFachada } from '@/clients/CursoClient.js';
import { 
  buscarInscripcionesPorEstudianteFachada, 
  matricularFachada, 
  cancelarDesdeLinkFachada 
} from '@/clients/InscripcionClient.js';

export default {
  components: {InscripcionList, MatriculaForm },
  data() {
    return {
      estudiante: null,
      inscripciones: [],
      cursos: []
    }
  },
  methods: {
    async cargarTodo() {
      const idEst = this.$route.params.id;
      // Comentario arriba de la línea
      // Cargamos info del estudiante, sus materias y los cursos disponibles en paralelo
      [this.estudiante, this.inscripciones, this.cursos] = await Promise.all([
        consultarPorIdFachada(idEst),
        buscarInscripcionesPorEstudianteFachada(idEst),
        consultarCursosFachada()
      ]);
    },
    async ejecutarMatricula(cursoId) {
      try {
        await matricularFachada(this.estudiante.id, cursoId);
        alert("¡Matriculación exitosa!");
        await this.cargarTodo(); // Refrescamos para ver cambios en cupos y lista
      } catch (e) {
        alert("Error: Es posible que no haya cupos o ya estés inscrito.");
      }
    },
    async ejecutarCancelacion(urlHateoas) {
      if (confirm("¿Seguro que desea cancelar esta matrícula?")) {
        // Comentario arriba de la línea
        // Usamos directamente la URL que nos dio el servidor
        await cancelarDesdeLinkFachada(urlHateoas);
        await this.cargarTodo();
      }
    }
  },
  mounted() {
    this.cargarTodo();
  }
}
</script>