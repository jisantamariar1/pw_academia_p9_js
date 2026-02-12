<template>
  <div v-if="mostrar" :class="['alerta', tipo]">
    <div class="contenido">
      <span>{{ mensaje }}</span>
      <button @click="cerrar" class="btn-close">×</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mostrar: Boolean,
    mensaje: String,
    tipo: String // success o error
  },
  methods: {
    cerrar() {
      this.$emit('ocultar');
    }
  },
  // Auto-cierre después de 3 segundos
  watch: {
    mostrar(nuevoValor) {
      if (nuevoValor) {
        setTimeout(() => {
          this.cerrar();
        }, 3000);
      }
    }
  }
}
</script>

<style scoped>
.alerta {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  color: white;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  min-width: 250px;
}

.success { background-color: #2ecc71; border-left: 5px solid #219150; }
.error { background-color: #e74c3c; border-left: 5px solid #c0392b; }

.contenido {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-close {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 10px;
}
</style>