<template>
  <table class="report-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Código</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Cupos</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="curso in cursos" :key="curso.id">
        <td>{{ curso.id }}</td>

        <!-- Código resaltado -->
        <td class="code-text">
          {{ curso.codigo }}
        </td>

        <td>{{ curso.nombre }}</td>
        <td>{{ curso.descripcion }}</td>
        <td>{{ curso.cupos }}</td>

        <td>
          <span
            :class="curso.estado === 'ABIERTO'
              ? 'badge-open'
              : 'badge-closed'">
            {{ curso.estado }}
          </span>
        </td>

        <td>
          <button
            @click="$emit('editar', curso)"
            class="btn-edit">
            Editar
          </button>

          <button
            @click="$emit('eliminar', curso.id)"
            class="btn-del">
            Borrar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['cursos']
}
</script>

<style scoped>
.report-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.report-table th,
.report-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

/* Código resaltado */
.code-text {
  font-weight: bold;
  color: #2980b9;
}

/* Estados */
.badge-open {
  background: #2ecc71;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.badge-closed {
  background: #e74c3c;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* Botones */
.btn-edit {
  background: #f39c12;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 4px;
}

.btn-del {
  background: #c0392b;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
