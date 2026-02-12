<template>
  <div class="form-container">
    <h4>
      {{ cursoEdit ? 'Editar Curso (ID: ' + cursoEdit.id + ')' : 'Nuevo Curso' }}
    </h4>

    <form @submit.prevent="enviar">

      <!-- NUEVO: Código del curso -->
      <div class="field">
        <label>Código del Curso:</label>
        <input
          v-model="curso.codigo"
          type="text"
          required
          placeholder="Ej: PROG-WEB-2">
      </div>

      <div class="field">
        <label>Nombre del Curso:</label>
        <input
          v-model="curso.nombre"
          type="text"
          required
          placeholder="Ej: Programación Web II">
      </div>

      <div class="field">
        <label>Descripción:</label>
        <textarea
          v-model="curso.descripcion"
          required
          placeholder="Detalles del curso...">
        </textarea>
      </div>

      <div class="field">
        <label>Cupos Disponibles:</label>
        <input
          v-model.number="curso.cupos"
          type="number"
          required
          min="0">
      </div>

      <!-- Estado actual cuando se edita -->
      <div class="field" v-if="cursoEdit">
        <label>Estado Actual:</label>
        <input :value="curso.estado" disabled>
      </div>

      <!-- Estado que se guardará dinámicamente -->
      <div class="field" v-if="cursoEdit">
        <label>Estado que se guardará:</label>
        <span :class="curso.cupos === 0 ? 'text-danger' : 'text-success'">
          {{ curso.cupos === 0 ? 'CERRADO' : 'ABIERTO' }}
        </span>
      </div>

      <div class="actions">
        <button type="submit" class="btn-save">
          {{ cursoEdit ? 'Actualizar' : 'Guardar' }}
        </button>

        <button
          type="button"
          @click="$emit('cancelar')"
          class="btn-cancel">
          Cancelar
        </button>
      </div>

    </form>
  </div>
</template>

<script>
import { guardarCursoFachada, actualizarCursoFachada } from '@/clients/CursoClient.js';

export default {
  props: ['cursoEdit'],

  data() {
    return {
      curso: {
        codigo: '', // NUEVO CAMPO
        nombre: '',
        descripcion: '',
        cupos: 10,
        estado: 'ABIERTO'
      }
    }
  },

  methods: {

    async enviar() {
      try {

        // Sincronizar estado automáticamente según cupos
        this.curso.estado = this.curso.cupos === 0 ? 'CERRADO' : 'ABIERTO';

        if (this.cursoEdit) {
          await actualizarCursoFachada(this.cursoEdit.id, this.curso);
          this.$emit('mostrar-alerta', 'Curso actualizado correctamente', 'success');
        } else {
          await guardarCursoFachada(this.curso);
          this.$emit('mostrar-alerta', 'Curso creado exitosamente', 'success');
        }

        this.$emit('actualizado');
        this.limpiarFormulario();

      } catch (e) {
        console.error("Error al procesar curso", e);
        this.$emit('mostrar-alerta', 'Error al procesar el curso. Verifique los datos.', 'error');
      }
    },

    limpiarFormulario() {
      this.curso = {
        codigo: '',
        nombre: '',
        descripcion: '',
        cupos: 10,
        estado: 'ABIERTO'
      };
    }
  },

  watch: {
    cursoEdit: {
      immediate: true,
      handler(val) {
        if (val) {
          this.curso = { ...val };
        } else {
          this.limpiarFormulario();
        }
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
}

.field {
  margin-bottom: 12px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  height: 70px;
  resize: vertical;
}

.text-success {
  color: #2ecc71;
  font-weight: bold;
}

.text-danger {
  color: #e74c3c;
  font-weight: bold;
}

.actions {
  margin-top: 15px;
}

.btn-save {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-cancel {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 10px;
}
</style>
