# 📚 Evaluación III - Frontend Biblioteca

**Estudiantes**: Rodrigo Segura: 20.349.553-6, rodrigo.segura@alu.ucm.cl || Jose ZúñigaCarrera: 20.180.085-4, jose.zuniga.01@alu.ucm.cl
**Carrera:** Ingeniería Civil Informática  
**Universidad:** Universidad Católica del Maule

---

🖥️ Descripción General
Este frontend fue desarrollado en React.js y forma parte de la Evaluación III. Se conecta a una API RESTful en Spring Boot para gestionar una biblioteca virtual con funcionalidades como:

Autenticación JWT

Roles diferenciados (ADMIN / LECTOR)

Visualización y gestión de libros

Préstamos y devoluciones

Visualización de multas

Control de acceso por vistas

Sistema de copias disponibles

⚙️ Tecnologías Usadas
React.js + Vite

Axios

React Router DOM

CSS personalizado (sin Bootstrap)

JWT en LocalStorage

📦 Instalación
Clona el repositorio:

bash
Copiar
Editar
git clone https://github.com/Jzvniga/Ev3-PrograWeb.git
cd Ev3-PrograWeb
Instala las dependencias:

bash
Copiar
Editar
npm install
Ejecuta la app:

bash
Copiar
Editar
npm run dev
Asegúrate de que el backend esté corriendo en http://localhost:8087 y permita CORS desde http://localhost:3000.

🔐 Autenticación y Autorización
El sistema usa JWT para autenticar usuarios. El token se almacena en localStorage y se inyecta automáticamente en cada petición usando Axios.

Roles:
ADMIN: Puede registrar usuarios, crear libros, agregar copias, ver todos los préstamos y multas.

LECTOR: Solo puede visualizar libros, ver sus préstamos y sus multas.

🚦 Rutas Protegidas
Se protegen las vistas según el rol:

/admin (solo ADMIN)

/lector (solo LECTOR)

/login, /register (acceso libre)

Acceso por URL directa restringido. Si no tienes rol válido, se redirige al login.

📁 Estructura de Carpetas

![image](https://github.com/user-attachments/assets/29c937a5-5020-43b8-bf07-8115c03c1af6)


🧪 Casos de Prueba y Validación Manual
Inicio de sesión ADMIN:
✔️ Ver menú completo
✔️ Crear libros y copias
✔️ Ver préstamos de todos
✔️ Ver multas de todos

Inicio de sesión LECTOR:
✔️ Ver libros
✔️ Ver sus préstamos
✔️ Ver sus multas
❌ No puede acceder a vistas de admin

Vistas protegidas:
✔️ No permite acceso sin login
✔️ Redirige si el token no es válido

🎨 Diseño Visual
Interfaz inspirada en BookHub:
✅ Barra superior azul
✅ Cards de libros con sombra
✅ Tipografía clara
✅ Botones diferenciados por rol

❗ Consideraciones Finales
No se implementó paginación ni buscador global.

No hay validaciones visuales en formularios.

No se implementó deploy, la app corre en local.

Las rutas del backend deben coincidir exactamente.
