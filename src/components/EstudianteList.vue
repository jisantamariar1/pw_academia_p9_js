<template>
  <table class="report-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Cédula</th>
        <th>Email</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="est in estudiantes" :key="est.id">
        <td>{{ est.id }}</td>
        <td>{{ est.nombre }}</td>
        <td>{{ est.apellido }}</td>
        <td>{{ est.cedula }}</td>
        <td>{{ est.email }}</td>
        <td>
          <button 
            @click="$emit('gestionar', est.id)" 
            class="btn-ins">
            Matricular
          </button>

          <button 
            @click="$emit('editar', est)" 
            class="btn-edit">
            Editar
          </button>

          <button 
            @click="$emit('eliminar', est.id)" 
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
  props: ['estudiantes']
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

/* Botón Matricular */
.btn-ins {
  background: #3498db;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 4px;
}

/* Botón Editar */
.btn-edit {
  background: #f39c12;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 4px;
}

/* Botón Borrar */
.btn-del {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
