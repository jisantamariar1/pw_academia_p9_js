<template>
  <div>
    
    <div class="container">
      <h2>Reporte de Cursos</h2>
      <button @click="abrirNuevo" class="btn-new">Agregar Curso</button>
      
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
  components: {CursoList, CursoForm },
  data() {
    return {
      listaCursos: [],
      mostrarForm: false,
      cursoSeleccionado: null
    }
  },
  methods: {
    async cargar() {
      this.listaCursos = await consultarCursosFachada();
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
      if(confirm("¿Eliminar curso?")) {
        await borrarCursoFachada(id);
        this.cargar();
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
  mounted() { this.cargar(); }
}
</script>