import React, { useEffect, useState } from 'react';
import { buscarPrestamosPorEmail } from '../../services/bookingService';
import './MisPrestamosPage.css';

const MisPrestamosPage = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState('');

useEffect(() => {
  const fetchPrestamos = async () => {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).token : null;
    const email = storedUser ? JSON.parse(storedUser).email : null;
    if (!token || !email) {
      setError('No estás autenticado');
      return;
    }

    try {
      const data = await buscarPrestamosPorEmail(email, token); // <-- CAMBIO AQUÍ
      setPrestamos(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los préstamos');
    }
  };

  fetchPrestamos();
}, []);

  return (
    <div className="prestamos-container">
      <h2 className="prestamos-title">Mis Préstamos</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="prestamos-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((p) => (
            <tr key={p.id} className={!p.estado ? 'prestamo-devuelto' : ''}>
              <td>{p.bookCopy?.book?.title || 'Desconocido'}</td>
              <td>{p.bookCopy?.book?.author || 'Desconocido'}</td>
              <td>{p.bookCopy?.book?.type || '-'}</td>
              <td>{p.estado ? 'En préstamo' : 'Devuelto'}</td>
              <td>{p.fechaInicio || '-'}</td>
              <td>{p.estado ? 'No devuelto' : p.fechaFin || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MisPrestamosPage;
