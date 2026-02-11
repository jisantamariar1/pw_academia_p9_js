<template>
  <div class="list-container">
    <h5>Cursos Matriculados</h5>
    <table class="report-table">
      <thead>
        <tr>
          <th>Curso</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ins in inscripciones" :key="ins.id">
          <td>{{ ins.nombreCurso }}</td>
          <td>{{ ins.fecha }}</td>
          <td>
            <span :class="ins.estado === 'ACTIVA' ? 'active' : 'canceled'">
              {{ ins.estado }}
            </span>
          </td>
          <td>
            <button 
              v-if="obtenerLinkCancelar(ins)" 
              @click="$emit('cancelar', obtenerLinkCancelar(ins).href)"
              class="btn-cancel"
            >
              Cancelar Matrícula
            </button>
            <span v-else class="no-action">Sin acciones</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['inscripciones'],
  methods: {
    // Comentario arriba de la línea
    // Función que extrae el link de cancelación si existe
    obtenerLinkCancelar(inscripcion) {
      return inscripcion.links.find(l => l.rel === 'cancelar-inscripcion');
    }
  }
}
</script>

<style scoped>
.active { color: #27ae60; font-weight: bold; }
.canceled { color: #7f8c8d; font-style: italic; }
.btn-cancel { background: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; }
.no-action { font-size: 0.8rem; color: #bdc3c7; }
</style>