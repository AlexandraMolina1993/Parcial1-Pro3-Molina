# ✂️ Peluquería Alex - Sistema de Gestión de Citas

Este es un sistema **Full Stack** desarrollado para la gestión de turnos de una peluquería. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) sobre las citas, gestionar estados de servicio y realizar búsquedas filtradas.

## 🚀 Tecnologías Utilizadas

* **Backend:** Node.js + Express.js.
* **Base de Datos:** MySQL (Librería `mysql2`).
* **Frontend:** HTML5, CSS3 y JavaScript Vanilla (Fetch API).
* **Seguridad/Conectividad:** Middleware CORS para comunicación entre puertos.

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:
1.  **Node.js** (Versión 14 o superior).
2.  **Servidor MySQL** (Puedes usar XAMPP, Laragon o MySQL Installer).
3.  **VS Code** (Recomendado).

## 🛠️ Instalación y Configuración

### 1. Configurar la Base de Datos
Abre tu gestor de MySQL (Workbench o phpMyAdmin) y ejecuta el siguiente script:

```sql
CREATE DATABASE peluqueria_alex;
USE peluqueria_alex;

CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    servicio VARCHAR(100) NOT NULL,
    fecha DATETIME NOT NULL,
    estado VARCHAR(20) DEFAULT 'Pendiente'
);

2. Configurar el Servidor (Backend)
Abre una terminal en la carpeta raíz de tu proyecto.

Instala las dependencias necesarias:
npm install express mysql2 cors

3. Verifica los datos de conexión en el archivo server.js:
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Tu usuario de MySQL
    password: '',      // Tu contraseña de MySQL
    database: 'peluqueria_alex'
});

¿Cómo Correr el Proyecto?
Iniciar MySQL: Activa los servicios de Apache y MySQL (en XAMPP, por ejemplo).

Iniciar Servidor Node: En la terminal del proyecto, ejecuta:

Bash
node server.js
Deberías ver: "Servidor corriendo en http://localhost:3000".

Abrir el Frontend:

Simplemente abre el archivo index.html en tu navegador.

Sugerencia: Usa la extensión Live Server de VS Code para una mejor experiencia.

💡 Funcionalidades del Panel
Gestión de Estados: Clasificación visual de turnos (Pendiente, Realizado, Cancelado) mediante etiquetas de colores.

Categorización Estricta: Selección de servicios predefinidos: Corte, Alisado, Permanente, Nutrición y Tintura.

Panel de Búsqueda Avanzada:

Búsqueda por ID exacto.

Búsqueda por Nombre del cliente (coincidencia parcial).

Filtro por Categoría.

Filtro por Fecha específica.

Fix de Zona Horaria: El sistema corrige automáticamente el desfase horario al editar una cita, asegurando que la hora no cambie inesperadamente.

Desarrollado con ❤️ por Alexandra - 2026