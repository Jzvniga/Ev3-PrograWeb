import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Acerca de la Biblioteca</h2>
      <p>Este sistema fue desarrollado como parte de una evaluación de programación con el objetivo de simular una biblioteca moderna y eficiente.</p>
      
      <h3>📚 Funcionalidades</h3>
      <ul>
        <li>Registro de usuarios con roles ADMIN y LECTOR</li>
        <li>Administración de préstamos y devoluciones</li>
        <li>Visualización de libros disponibles</li>
        <li>Gestión de multas por retraso</li>
      </ul>

      <h3>👥 Roles</h3>
      <ul>
        <li><strong>ADMIN:</strong> Puede registrar usuarios, prestar y devolver libros, y consultar multas de todos los lectores.</li>
        <li><strong>LECTOR:</strong> Puede ver libros, sus préstamos activos y multas personales.</li>
      </ul>

      <h3>🛠️ Tecnologías utilizadas</h3>
      <ul>
        <li><strong>Frontend:</strong> React.js, Axios, React Router</li>
        <li><strong>Backend:</strong> Spring Boot, Spring Security con JWT</li>
        <li><strong>Base de Datos:</strong> H2 (en memoria)</li>
      </ul>

      <p style={{ marginTop: '20px' }}>
        Desarrollado por Ignacio como parte de la EV3 del curso de Programación. 
      </p>
    </div>
  );
};

export default AboutPage;