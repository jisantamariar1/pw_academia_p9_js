<template>
    <div>
        <div class="container">
            <h2>Reporte de Estudiantes</h2>

            <button @click="mostrarFormulario = true" class="btn-new">
                Nuevo Estudiante
            </button>

            <EstudianteList :estudiantes="listaEstudiantes" @eliminar="borrarEstudiante" @gestionar="irAInscripciones"
                @editar="editarEstudiante" />

            <!-- Formulario de Crear / Editar -->
            <EstudianteForm v-if="mostrarFormulario" :estudianteEdit="estudianteSeleccionado"
                @guardado="finalizarOperacion" @cancelar="cerrarFormulario" />

        </div>
    </div>
</template>

<script>

import EstudianteList from '@/components/EstudianteList.vue';
import EstudianteForm from '@/components/EstudianteForm.vue';
import { consultarTodosFachada, borrarFachada } from '@/clients/EstudianteClient.js';

export default {
    components: {
       
        EstudianteList,
        EstudianteForm
    },
    data() {
        return {
            listaEstudiantes: [],
            mostrarFormulario: false,
            estudianteSeleccionado: null
        }
    },
    methods: {

        async cargarEstudiantes() {
            try {
                this.listaEstudiantes = await consultarTodosFachada();
            } catch (error) {
                console.error("Error al cargar estudiantes", error);
            }
        },

        async borrarEstudiante(id) {
            if (confirm("¿Estás seguro de eliminar este estudiante?")) {
                await borrarFachada(id);
                await this.cargarEstudiantes();
            }
        },

        irAInscripciones(id) {
            // Opción A: Usando el nombre de la ruta (Más seguro)
            this.$router.push({ name: 'inscripcion', params: { id: id } });

            // Opción B: Usando el path directo
            // this.$router.push(`/inscripcion/${id}`); 
        },


        finalizarOperacion() {
            this.cerrarFormulario();
            this.cargarEstudiantes(); // Recarga la tabla
        },

        cerrarFormulario() {
            this.mostrarFormulario = false;
            this.estudianteSeleccionado = null;
        },

        // Método para abrir el form en modo edición
        editarEstudiante(est) {
            this.estudianteSeleccionado = est;
            this.mostrarFormulario = true;
        }
    },

    // Carga los datos apenas se monta la vista
    mounted() {
        this.cargarEstudiantes();
    }
}
</script>
