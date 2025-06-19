import React, { useState } from 'react';
import { crearPrestamo } from '../../services/bookingService';

const PrestamoPage = () => {
  const [email, setEmail] = useState('');
  const [bookId, setbookId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).token : null;

    if (!token) {
      setError('No estás autenticado');
      return;
    }

    try {
      await crearPrestamo({ email, bookId: parseInt(bookId) }, token);
      setMensaje('📚 Préstamo creado exitosamente');
      setEmail('');
      setbookId('');
    } catch (err) {
      console.error(err);
      setError('❌ Error al crear el préstamo');
    }
  };

  return (
    <div>
      <h2>Crear Préstamo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email del lector:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID de la copia del libro:</label>
          <input
            type="number"
            value={bookId}
            onChange={(e) => setbookId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Prestar</button>
      </form>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PrestamoPage;