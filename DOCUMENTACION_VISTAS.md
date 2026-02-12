# Documentación de las 4 Vistas de la Aplicación

## Tabla de Contenidos
1. [LoginView](#1-loginview)
2. [EstudiantesView](#2-estudiantesview)
3. [CursosView](#3-cursosview)
4. [InscripcionesView](#4-inscripcionesview)
5. [Resumen de Componentes](#5-resumen-de-componentes)

---

## 1. LoginView

### 📋 Descripción
Vista de autenticación que permite a los usuarios iniciar sesión en el sistema.

### 🧩 Componentes Utilizados
- **LoginForm**: Formulario de inicio de sesión
- **AlertaFlash**: Sistema de notificaciones

### 🔄 Flujo de Funcionamiento

```
Usuario ingresa credenciales → LoginForm valida → 
Emite 'login-exitoso' → LoginView redirige a /estudiantes
```

### 📊 Data (Estado Local)
```javascript
{
  alerta: {
    mostrar: false,    // Controla visibilidad de la alerta
    mensaje: '',       // Texto del mensaje
    tipo: 'success'    // 'success' o 'error'
  }
}
```

### 📤 Emits Recibidos

| Componente | Evento | Parámetros | Descripción |
|------------|--------|------------|-------------|
| LoginForm | `login-exitoso` | ninguno | Se emite cuando el login es exitoso |
| LoginForm | `mostrar-alerta` | mensaje, tipo | Se emite cuando hay un error de autenticación |
| AlertaFlash | `ocultar` | ninguno | Se emite para cerrar la alerta |

### ⚙️ Métodos Principales

| Método | Descripción |
|--------|-------------|
| `irAlHome()` | Redirige al usuario a `/estudiantes` después del login exitoso |
| `mostrarAlerta(mensaje, tipo)` | Muestra una alerta flash con el mensaje y tipo especificado |
| `ocultarAlerta()` | Oculta la alerta actual |

---

## 2. EstudiantesView

### 📋 Descripción
Vista principal para la gestión de estudiantes. Permite listar, crear, editar y eliminar estudiantes.

### 🧩 Componentes Utilizados
- **EstudianteList**: Tabla que muestra todos los estudiantes
- **EstudianteForm**: Formulario para crear/editar estudiantes
- **AlertaFlash**: Sistema de notificaciones

### 🔄 Flujo de Funcionamiento

```
mounted() → cargarEstudiantes() → Muestra lista
Usuario hace clic en "Nuevo" → Muestra formulario
Usuario hace clic en "Editar" → Carga datos en formulario
Usuario guarda → Emite 'guardado' → Refresca lista
```

### 📊 Data (Estado Local)
```javascript
{
  listaEstudiantes: [],           // Array de estudiantes
  mostrarFormulario: false,       // Controla visibilidad del formulario
  estudianteSeleccionado: null,   // Estudiante en edición (null = nuevo)
  alerta: {
    mostrar: false,
    mensaje: '',
    tipo: 'success'
  }
}
```

### 📤 Emits Recibidos

| Componente | Evento | Parámetros | Descripción |
|------------|--------|------------|-------------|
| EstudianteList | `eliminar` | id | Se emite para borrar un estudiante |
| EstudianteList | `gestionar` | id | Se emite para ir a la vista de inscripciones |
| EstudianteList | `editar` | estudiante | Se emite para editar un estudiante |
| EstudianteForm | `guardado` | ninguno | Se emite cuando se guarda exitosamente |
| EstudianteForm | `cancelar` | ninguno | Se emite para cerrar el formulario |
| EstudianteForm | `mostrar-alerta` | mensaje, tipo | Se emite para mostrar notificaciones |
| AlertaFlash | `ocultar` | ninguno | Se emite para cerrar la alerta |

### ⚙️ Métodos Principales

| Método | Descripción |
|--------|-------------|
| `cargarEstudiantes()` | Consulta todos los estudiantes desde el backend |
| `borrarEstudiante(id)` | Elimina un estudiante y recarga la lista |
| `editarEstudiante(est)` | Prepara el formulario para editar un estudiante |
| `finalizarOperacion()` | Cierra el formulario y recarga la lista |
| `cerrarFormulario()` | Oculta el formulario y limpia la selección |
| `irAInscripciones(id)` | Navega a la vista de inscripciones del estudiante |

### 🎯 Lifecycle Hooks
- **mounted()**: Carga la lista de estudiantes al iniciar

---

## 3. CursosView

### 📋 Descripción
Vista para la gestión de cursos. Permite listar, crear, editar y eliminar cursos.

### 🧩 Componentes Utilizados
- **CursoList**: Tabla que muestra todos los cursos
- **CursoForm**: Formulario para crear/editar cursos
- **AlertaFlash**: Sistema de notificaciones

### 🔄 Flujo de Funcionamiento

```
mounted() → cargar() → Muestra lista de cursos
Usuario hace clic en "Agregar Curso" → Muestra formulario
Usuario edita → Carga datos en formulario
Usuario guarda → Emite 'actualizado' → Refresca lista
```

### 📊 Data (Estado Local)
```javascript
{
  listaCursos: [],          // Array de cursos
  mostrarForm: false,       // Controla visibilidad del formulario
  cursoSeleccionado: null,  // Curso en edición (null = nuevo)
  alerta: {
    mostrar: false,
    mensaje: '',
    tipo: 'success'
  }
}
```

### 📤 Emits Recibidos

| Componente | Evento | Parámetros | Descripción |
|------------|--------|------------|-------------|
| CursoList | `editar` | curso | Se emite para editar un curso |
| CursoList | `eliminar` | id | Se emite para borrar un curso |
| CursoForm | `actualizado` | ninguno | Se emite cuando se guarda exitosamente |
| CursoForm | `cancelar` | ninguno | Se emite para cerrar el formulario |
| CursoForm | `mostrar-alerta` | mensaje, tipo | Se emite para mostrar notificaciones |
| AlertaFlash | `ocultar` | ninguno | Se emite para cerrar la alerta |

### ⚙️ Métodos Principales

| Método | Descripción |
|--------|-------------|
| `cargar()` | Consulta todos los cursos desde el backend |
| `abrirNuevo()` | Prepara el formulario para crear un nuevo curso |
| `prepararEdicion(curso)` | Prepara el formulario para editar un curso |
| `borrar(id)` | Elimina un curso y recarga la lista |
| `refrescar()` | Cierra el formulario y recarga la lista |
| `cerrar()` | Oculta el formulario y limpia la selección |

### 🎯 Lifecycle Hooks
- **mounted()**: Carga la lista de cursos al iniciar

---

## 4. InscripcionesView

### 📋 Descripción
Vista para gestionar las matrículas de un estudiante específico. Permite inscribir a un estudiante en cursos y cancelar inscripciones.

### 🧩 Componentes Utilizados
- **MatriculaForm**: Selector de curso para nueva inscripción
- **InscripcionList**: Tabla de cursos matriculados
- **AlertaFlash**: Sistema de notificaciones

### 🔄 Flujo de Funcionamiento

```
mounted() → cargarTodo() → Carga estudiante, inscripciones y cursos en paralelo
Usuario selecciona curso → Emite 'matricular' → ejecutarMatricula()
Usuario cancela matrícula → Emite 'cancelar' → ejecutarCancelacion()
```

### 📊 Data (Estado Local)
```javascript
{
  estudiante: null,       // Datos del estudiante actual
  inscripciones: [],      // Array de inscripciones del estudiante
  cursos: [],            // Array de todos los cursos disponibles
  alerta: {
    mostrar: false,
    mensaje: '',
    tipo: 'success'
  }
}
```

### 📤 Emits Recibidos

| Componente | Evento | Parámetros | Descripción |
|------------|--------|------------|-------------|
| MatriculaForm | `matricular` | cursoId | Se emite para inscribir al estudiante en un curso |
| InscripcionList | `cancelar` | urlHateoas | Se emite para cancelar una inscripción (usa HATEOAS) |
| AlertaFlash | `ocultar` | ninguno | Se emite para cerrar la alerta |

### ⚙️ Métodos Principales

| Método | Descripción |
|--------|-------------|
| `cargarTodo()` | Carga en paralelo: estudiante, inscripciones y cursos usando `Promise.all()` |
| `ejecutarMatricula(cursoId)` | Matricula al estudiante en el curso seleccionado |
| `ejecutarCancelacion(urlHateoas)` | Cancela una inscripción usando el link HATEOAS |

### 🎯 Lifecycle Hooks
- **mounted()**: Carga todos los datos necesarios al iniciar

### 🔗 Características Especiales
- **Carga Paralela**: Usa `Promise.all()` para optimizar la velocidad de carga
- **HATEOAS**: Utiliza links hipermedia para la cancelación de inscripciones
- **Parámetros de Ruta**: Obtiene el ID del estudiante desde `this.$route.params.id`

---

## 5. Resumen de Componentes

### AlertaFlash (Componente Global)

**Usado en**: Todas las vistas

#### Props
| Prop | Tipo | Descripción |
|------|------|-------------|
| `mostrar` | Boolean | Controla la visibilidad de la alerta |
| `mensaje` | String | Texto a mostrar en la alerta |
| `tipo` | String | 'success' o 'error' (determina el color) |

#### Emits
| Evento | Parámetros | Descripción |
|--------|------------|-------------|
| `ocultar` | ninguno | Se emite cuando se cierra la alerta |

#### Características
- **Auto-cierre**: Se cierra automáticamente después de 3 segundos
- **Watch**: Monitorea cambios en la prop `mostrar` para activar el temporizador
- **Posición**: Fixed en la esquina superior derecha

---

### LoginForm

**Usado en**: LoginView

#### Props
Ninguna

#### Emits
| Evento | Parámetros | Descripción |
|--------|------------|-------------|
| `login-exitoso` | ninguno | Se emite cuando el login es exitoso |
| `mostrar-alerta` | mensaje, tipo | Se emite cuando hay errores |

#### Data
```javascript
{
  usuario: '',
  password: '',
  error: null,
  cargando: false
}
```

#### Características
- Guarda el token en `localStorage`
- Guarda el nombre de usuario en `localStorage`
- Maneja estados de carga

---

### EstudianteForm

**Usado en**: EstudiantesView

#### Props
| Prop | Tipo | Descripción |
|------|------|-------------|
| `estudianteEdit` | Object | Estudiante a editar (null para nuevo) |

#### Emits
| Evento | Parámetros | Descripción |
|--------|------------|-------------|
| `guardado` | ninguno | Se emite cuando se guarda exitosamente |
| `cancelar` | ninguno | Se emite para cerrar el formulario |
| `mostrar-alerta` | mensaje, tipo | Se emite para mostrar notificaciones |

#### Data
```javascript
{
  estudiante: {
    nombre: '',
    apellido: '',
    cedula: '',
    email: ''
  }
}
```

#### Watch
- **estudianteEdit**: Carga los datos cuando cambia (modo edición)

---

### EstudianteList

**Usado en**: EstudiantesView

#### Props
| Prop | Tipo | Descripción |
|------|------|-------------|
| `estudiantes` | Array | Lista de estudiantes a mostrar |

#### Emits
| Evento | Parámetros | Descripción |
|--------|------------|-------------|
| `eliminar` | id | Se emite para borrar un estudiante |
| `gestionar` | id | Se emite para ir a inscripciones |
| `editar` | estudiante | Se emite para editar un estudiante |

#### Características
- Muestra tabla con: ID, Nombre, Apellido, Cédula, Email
- Botones: Matricular, Editar, Borrar

---

### CursoForm

**Usado en**: CursosView

#### Props
| Prop | Tipo | Descripción |
|------|------|-------------|
| `cursoEdit` | Object | Curso a editar (null para nuevo) |

#### Emits
| Evento | Parámetros | Descripción |
|--------|------------|-------------|
| `actualizado` | ninguno | Se emite cuando se guarda exitosamente |
| `cancelar` | ninguno | Se emite para cerrar el formulario |
| `mostrar-alerta` | mensaje, tipo | Se emite para mostrar notificaciones |

#### Data
```javascript
{
  curso: {
    codigo: '',
    nombre: '',
    descripcion: '',
    cupos: 10,
    estado: 'ABIERTO'
  }
}
```

#### Características Especiales
- **Sincronización automática**: El estado se calcula automáticamente según los cupos
  - Si `cupos === 0` → estado = 'CERRADO'
  - Si `cupos > 0` → estado = 'ABIERTO'
- **Watch**: Carga los datos cuando cambia `cursoEdit`

---

### CursoList

**Usado en**: CursosView

#### Props
| Prop | Tipo | Descripción |
|------|------|-------------|
| `cursos` | Array | Lista de cursos a mostrar |

#### Emits
| Evento | Parámetros | Descripción |
|--------|------------|-------------|
| `editar` | curso | Se emite para editar un curso |
| `eliminar` | id | Se emite para borrar un curso |

#### Características
- Muestra tabla con: ID, Código, Nombre, Descripción, Cupos, Estado
- Badges de estado con colores (verde=ABIERTO, rojo=CERRADO)
- Botones: Editar, Borrar

---

### MatriculaForm

**Usado en**: InscripcionesView

#### Props
| Prop | Tipo | Descripción |
|------|------|-------------|
| `cursosDisponibles` | Array | Lista de cursos disponibles para inscripción |

#### Emits
| Evento | Parámetros | Descripción |
|--------|------------|-------------|
| `matricular` | cursoId | Se emite para inscribir en un curso |

#### Data
```javascript
{
  cursoSeleccionado: ''
}
```

#### Características
- Selector (dropdown) de cursos
- Deshabilita cursos con estado 'CERRADO'
- Muestra cupos disponibles
- Limpia la selección después de emitir

---

### InscripcionList

**Usado en**: InscripcionesView

#### Props
| Prop | Tipo | Descripción |
|------|------|-------------|
| `inscripciones` | Array | Lista de inscripciones del estudiante |

#### Emits
| Evento | Parámetros | Descripción |
|--------|------------|-------------|
| `cancelar` | urlHateoas | Se emite para cancelar una inscripción |

#### Métodos
```javascript
obtenerLinkCancelar(inscripcion) {
  return inscripcion.links.find(l => l.rel === 'cancelar-inscripcion');
}
```

#### Características Especiales
- **HATEOAS**: Extrae el link de cancelación desde los links de la inscripción
- Solo muestra el botón "Cancelar" si existe el link HATEOAS
- Muestra estados con colores (verde=ACTIVA, gris=CANCELADA)
- Muestra: Curso, Fecha, Estado, Acciones

---

## 📊 Diagrama de Flujo de Datos

```
┌─────────────────┐
│   LoginView     │
│  (Autenticación)│
└────────┬────────┘
         │ login exitoso
         ↓
┌─────────────────┐
│ EstudiantesView │ ←──────────────┐
│  (Vista Principal)                │
└────────┬────────┘                 │
         │                          │
         │ Click "Matricular"       │
         ↓                          │
┌─────────────────┐                 │
│InscripcionesView│                 │
│  (Gestión de    │                 │
│   Matrículas)   │                 │
└────────┬────────┘                 │
         │                          │
         │ Click "Volver"           │
         └──────────────────────────┘

┌─────────────────┐
│   CursosView    │
│ (Gestión Cursos)│
└─────────────────┘
```

---

## 🔑 Conceptos Clave

### 1. **Comunicación Padre-Hijo**
- **Props**: Datos fluyen del padre al hijo
- **Emits**: Eventos fluyen del hijo al padre

### 2. **Patrón de Edición**
Todas las vistas de gestión (Estudiantes, Cursos) usan el mismo patrón:
```
1. Lista muestra datos
2. Click "Editar" → Pasa objeto completo al formulario
3. Formulario recibe prop y carga datos
4. Usuario modifica y guarda
5. Formulario emite evento
6. Vista recarga datos
```

### 3. **Sistema de Alertas Centralizado**
- Todas las vistas usan el mismo componente `AlertaFlash`
- Manejo consistente de mensajes de éxito/error
- Auto-cierre después de 3 segundos

### 4. **HATEOAS en Inscripciones**
- Los links de acción vienen del backend
- El frontend solo ejecuta las acciones disponibles
- Evita lógica de negocio en el frontend

---

## 📝 Notas Importantes

1. **Carga Paralela**: `InscripcionesView` usa `Promise.all()` para optimizar la carga de datos
2. **LocalStorage**: El token y usuario se guardan en el navegador
3. **Validación de Estado**: Los cursos cerrados no pueden ser seleccionados en el formulario de matrícula
4. **Sincronización Automática**: El estado de un curso se calcula automáticamente según los cupos
5. **Navegación Programática**: Se usa `this.$router.push()` para navegar entre vistas
