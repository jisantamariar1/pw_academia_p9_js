<template>
    <div>
        <div class="container">

            <!-- Encabezado alineado -->
            <div class="header-section">
                <h2>Reporte de Estudiantes</h2>

                <button 
                    @click="mostrarFormulario = true" 
                    class="btn-new">
                    + Nuevo Estudiante
                </button>
            </div>

            <EstudianteList
                :estudiantes="listaEstudiantes"
                @eliminar="borrarEstudiante"
                @gestionar="irAInscripciones"
                @editar="editarEstudiante"
            />

            <!-- Formulario con separación visual -->
            <div class="form-spacer">
                <EstudianteForm
                    v-if="mostrarFormulario"
                    :estudianteEdit="estudianteSeleccionado"
                    @guardado="finalizarOperacion"
                    @cancelar="cerrarFormulario"
                    @mostrar-alerta="mostrarAlerta"
                />
            </div>

        </div>
        
        <!-- AlertaFlash -->
        <AlertaFlash
            :mostrar="alerta.mostrar"
            :mensaje="alerta.mensaje"
            :tipo="alerta.tipo"
            @ocultar="ocultarAlerta"
        />
    </div>
</template>

<script>
import EstudianteList from '@/components/EstudianteList.vue';
import EstudianteForm from '@/components/EstudianteForm.vue';
import AlertaFlash from '@/components/AlertaFlash.vue';
import { consultarTodosFachada, borrarFachada } from '@/clients/EstudianteClient.js';

export default {
    components: {
        EstudianteList,
        EstudianteForm,
        AlertaFlash
    },

    data() {
        return {
            listaEstudiantes: [],
            mostrarFormulario: false,
            estudianteSeleccionado: null,
            alerta: {
                mostrar: false,
                mensaje: '',
                tipo: 'success'
            }
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
            await borrarFachada(id);
            await this.cargarEstudiantes();
            this.mostrarAlerta('Estudiante eliminado correctamente', 'success');
        },

        mostrarAlerta(mensaje, tipo = 'success') {
            this.alerta.mostrar = true;
            this.alerta.mensaje = mensaje;
            this.alerta.tipo = tipo;
        },

        ocultarAlerta() {
            this.alerta.mostrar = false;
        },

        irAInscripciones(id) {
            this.$router.push({ name: 'inscripcion', params: { id: id } });
        },

        finalizarOperacion() {
            this.cerrarFormulario();
            this.cargarEstudiantes();
        },

        cerrarFormulario() {
            this.mostrarFormulario = false;
            this.estudianteSeleccionado = null;
        },

        editarEstudiante(est) {
            this.estudianteSeleccionado = est;
            this.mostrarFormulario = true;
        }
    },

    mounted() {
        this.cargarEstudiantes();
    }
}
</script>

<style scoped>
.container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

/* Alineación del título y botón */
.header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
}

h2 {
    color: #2c3e50;
    margin: 0;
}

/* Espaciador del formulario */
.form-spacer {
    margin-top: 40px; /* separa el formulario de la lista */
    padding-top: 20px;
    border-top: 1px dashed #ccc; /* línea sutil divisoria */
}

/* Botón moderno */
.btn-new {
    background-color: #2c3e50;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.btn-new:hover {
    background-color: #34495e;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn-new:active {
    transform: translateY(0);
}
</style>
