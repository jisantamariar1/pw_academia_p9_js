<template>
  <div class="form-container">
    <h4>
      {{ estudianteEdit 
          ? 'Editar Estudiante ID: ' + estudianteEdit.id 
          : 'Nuevo Estudiante' }}
    </h4>

    <form @submit.prevent="guardar">

      <div class="field">
        <label>Nombre:</label>
        <input 
          v-model="estudiante.nombre" 
          type="text" 
          required 
          placeholder="Ej: Andrés">
      </div>

      <div class="field">
        <label>Apellido:</label>
        <input 
          v-model="estudiante.apellido" 
          type="text" 
          required 
          placeholder="Ej: Vaca">
      </div>

      <div class="field">
        <label>Cédula:</label>
        <input 
          v-model="estudiante.cedula" 
          type="text" 
          required 
          placeholder="17xxxxxxx">
      </div>

      <div class="field">
        <label>Email:</label>
        <input 
          v-model="estudiante.email" 
          type="email" 
          required 
          placeholder="correo@ejemplo.com">
      </div>

      <div class="actions">
        <button type="submit" class="btn-save">
          {{ estudianteEdit ? 'Actualizar' : 'Guardar' }}
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
import { guardarFachada, actualizarFachada } from '@/clients/EstudianteClient.js';

export default {
  // Props para recibir datos en caso de edición
  props: ['estudianteEdit'],

  data() {
    return {
      estudiante: {
        nombre: '',
        apellido: '',
        cedula: '',
        email: ''
      }
    }
  },

  methods: {

    async guardar() {
      try {

        if (this.estudianteEdit) {
          // Usamos el ID que viene de la prop para actualizar
          await actualizarFachada(this.estudianteEdit.id, this.estudiante);
          this.$emit('mostrar-alerta', 'Estudiante actualizado con éxito', 'success');
        } else {
          await guardarFachada(this.estudiante);
          this.$emit('mostrar-alerta', 'Estudiante guardado con éxito', 'success');
        }

        this.$emit('guardado');
        this.limpiarFormulario();

      } catch (error) {
        console.error("Error al procesar estudiante", error);
        this.$emit('mostrar-alerta', 'Ocurrió un error al guardar', 'error');
      }
    },

    limpiarFormulario() {
      this.estudiante = {
        nombre: '',
        apellido: '',
        cedula: '',
        email: ''
      };
    }
  },

  // Si estudianteEdit cambia (al darle editar), cargamos los datos
  watch: {
    estudianteEdit: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // Clonamos para evitar modificar directamente la prop
          this.estudiante = { ...newVal };
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
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
