<template>
  <div class="matricula-box">
    <h5>Matricular en Nuevo Curso</h5>
    <div class="form-row">
      <select v-model="cursoSeleccionado">
        <option disabled value="">Seleccione un curso...</option>
        <option 
          v-for="c in cursosDisponibles" 
          :key="c.id" 
          :value="c.id"
          :disabled="c.estado === 'CERRADO'"
        >
          {{ c.nombre }} (Cupos: {{ c.cupos }})
        </option>
      </select>
      <button @click="enviar" :disabled="!cursoSeleccionado" class="btn-add">
        Inscribir
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cursosDisponibles'],
  data() {
    return {
      cursoSeleccionado: ''
    }
  },
  methods: {
    enviar() {
      this.$emit('matricular', this.cursoSeleccionado);
      this.cursoSeleccionado = '';
    }
  }
}
</script>