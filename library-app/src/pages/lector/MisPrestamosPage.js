import React, { useEffect, useState } from 'react';
import { getMisPrestamos } from '../../services/bookingService';

const MisPrestamosPage = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrestamos = async () => {
      const storedUser = localStorage.getItem('user');
      const token = storedUser ? JSON.parse(storedUser).token : null;
      if (!token) {
        setError('No estás autenticado');
        return;
      }

      try {
        const data = await getMisPrestamos(token);
        setPrestamos(data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los préstamos');
      }
    };

    fetchPrestamos();
  }, []);

  return (
    <div>
      <h2>Mis Préstamos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {prestamos.map((p) => (
          <li
            key={p.id}
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: p.estado ? '#ffffff' : '#f0f0f0',
              opacity: p.estado ? 1 : 0.6,
            }}
          >
            📚 <strong>{p.bookCopy?.book?.title || 'Título no disponible'}</strong><br />
            📅 Fecha de préstamo: {p.fechaInicio || 'No disponible'}<br />
            📅 Fecha devolución: {p.estado ? 'No devuelto' : (p.fechaFin || 'Devuelto')}<br />
            🔄 Estado: {p.estado ? 'En préstamo' : 'Devuelto'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisPrestamosPage;