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
      <ul>
        {prestamos.map((p) => (
          <li key={p.id}>
            Libro: <strong>{p.bookCopy.book.title}</strong><br />
            Fecha de préstamo: {p.fechaPrestamo}<br />
            Fecha devolución: {p.fechaDevolucion || 'No devuelto'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisPrestamosPage;