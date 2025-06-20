import React, { useState } from 'react';
import { buscarPrestamosPorEmail, devolverPrestamo } from '../../services/bookingService';

const DevolucionPage = () => {
  const [email, setEmail] = useState('');
  const [prestamos, setPrestamos] = useState([]);
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    setMensaje('');
    setError('');
    setPrestamos([]);
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    if (!email) {
      setError('Debes ingresar un email');
      return;
    }

    try {
      const data = await buscarPrestamosPorEmail(email, token);
      const activos = data.filter(p => p.estado === true);
      setPrestamos(activos);
    } catch (err) {
      console.error(err);
      setError('❌ Error al buscar préstamos');
    }
  };

  const handleDevolucion = async () => {
    setMensaje('');
    setError('');
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    if (!prestamoSeleccionado) {
      setError('Selecciona un préstamo para devolver');
      return;
    }

    try {
      await devolverPrestamo(prestamoSeleccionado, token);
      setMensaje('✅ Préstamo devuelto');
      setPrestamos(prev => prev.filter(p => p.id !== prestamoSeleccionado));
    } catch (err) {
      console.error(err);
      setError('❌ Error al devolver préstamo');
    }
  };

  return (
    <div>
      <h2>Devolución</h2>

      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>
      <button onClick={handleDevolucion}>Devolución</button>

      <ul style={{ marginTop: '1rem', listStyle: 'none' }}>
        {prestamos.map((p) => (
          <li key={p.id}>
            <input
              type="radio"
              name="prestamo"
              value={p.id}
              onChange={() => setPrestamoSeleccionado(p.id)}
            />
            Libro #{p.bookCopy.book.id}. {p.bookCopy.book.title} {p.bookCopy.book.author} {p.bookCopy.book.type} 
            copia {p.bookCopy.id} 
            fecha {p.fechaInicio} - {p.fechaFin}
          </li>
        ))}
      </ul>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DevolucionPage;