import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1>📚 Acerca de la Biblioteca</h1>
      <p className="description">
        Este sistema fue desarrollado como parte de una evaluación de programación,
        con el objetivo de simular una biblioteca moderna, eficiente y segura.
      </p>

      <section>
        <h2>✨ Funcionalidades</h2>
        <ul>
          <li>Registro de usuarios con roles <strong>ADMIN</strong> y <strong>LECTOR</strong></li>
          <li>Administración de préstamos y devoluciones</li>
          <li>Visualización de libros disponibles</li>
          <li>Gestión de multas por retraso</li>
        </ul>
      </section>

      <section>
        <h2>👥 Roles</h2>
        <ul>
          <li><strong>ADMIN:</strong> Puede registrar usuarios, crear libros, prestar y devolver copias, y consultar multas de todos los lectores.</li>
          <li><strong>LECTOR:</strong> Puede ver libros, sus préstamos activos y sus propias multas.</li>
        </ul>
      </section>

      <section>
        <h2>🛠️ Tecnologías Utilizadas</h2>
        <ul>
          <li><strong>Frontend:</strong> React.js, Axios, React Router</li>
          <li><strong>Backend:</strong> Spring Boot, Spring Security con JWT</li>
          <li><strong>Base de Datos:</strong> PostgreSQL (persistente)</li>
        </ul>
      </section>

      <p className="footer-note">
        Desarrollado por <strong>Rodrigo Segura y José Zúñiga</strong> como parte de la EV3 del curso de Programación.
       
      </p>
    </div>
  );
};

export default AboutPage;