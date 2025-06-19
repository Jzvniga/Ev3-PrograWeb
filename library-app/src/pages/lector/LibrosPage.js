import React, { useEffect, useState } from 'react';
import { getLibros } from '../../services/bookService';

const LibrosPage = () => {
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState('');

useEffect(() => {
  const fetchLibros = async () => {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).token : null; 
    if (!token) {
      setError('No estás autenticado');
      return;
    }

    try {
      const data = await getLibros(token);
      setLibros(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los libros');
    }
  };

   setTimeout(fetchLibros, 100); 

  fetchLibros();
}, []);

  return (
    <div>
      <h2>Libros disponibles</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {libros.map((libro) => (
          <li key={libro.id}>
            <strong>{libro.title}</strong> - {libro.author} ({libro.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibrosPage;