import React, { useState } from 'react';
import { crearPrestamo } from '../../services/bookingService';
import { buscarLibroPorTitulo } from '../../services/bookService';
import { getCopiasDisponiblesPorLibro } from '../../services/bookCopyService';

const PrestamoPage = () => {
  const [email, setEmail] = useState('');
  const [titulo, setTitulo] = useState('');
  const [copias, setCopias] = useState([]);
  const [bookCopyId, setBookCopyId] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    setError('');
    setCopias([]);
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    try {
      const libro = await buscarLibroPorTitulo(titulo, token);
      const copiasDisponibles = await getCopiasDisponiblesPorLibro(libro.id, token);
      setCopias(copiasDisponibles);
    } catch (err) {
      console.error(err);
      setError('❌ Error al buscar copias disponibles');
    }
  };

  const handleSubmit = async () => {
    setMensaje('');
    setError('');
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    if (!bookCopyId || !email) {
      setError('Debes seleccionar una copia y un lector');
      return;
    }

    try {
      await crearPrestamo({ email, bookId: bookCopyId }, token);
      setMensaje('📚 Préstamo creado exitosamente');
      setEmail('');
      setTitulo('');
      setCopias([]);
    } catch (err) {
      console.error(err);
      setError('❌ Error al crear el préstamo');
    }
  };

  return (
    <div>
      <h2>Préstamo</h2>

      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Crear Préstamo</button>

      <br /><br />

      <input
        type="text"
        placeholder="título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>

      <ul style={{ marginTop: '1rem', listStyle: 'none' }}>
        {copias.map((copia) => (
          <li key={copia.id}>
            <input
              type="radio"
              name="bookCopy"
              value={copia.id}
              onChange={() => setBookCopyId(copia.id)}
            />
            Libro #{copia.book.id}. {copia.book.title} {copia.book.author} {copia.book.type} copia {copia.id}
          </li>
        ))}
      </ul>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PrestamoPage;