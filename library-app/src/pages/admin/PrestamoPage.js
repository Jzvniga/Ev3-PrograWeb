import React, { useState } from 'react';
import { crearPrestamo } from '../../services/bookingService';
import { buscarLibroPorTitulo } from '../../services/bookService';
import { getCopiasDisponiblesPorLibro } from '../../services/bookCopyService';
import './PrestamoPage.css';

const PrestamoPage = () => {
  const [email, setEmail] = useState('');
  const [titulo, setTitulo] = useState('');
  const [copias, setCopias] = useState([]);
  const [bookCopyId, setBookCopyId] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    setError('');
    setMensaje('');
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
    <div className="prestamo-container">
      <h2>Registrar Préstamo</h2>

      <div className="prestamo-form">
        <label>Email del lector:</label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmit}>Crear Préstamo</button>
      </div>

      <div className="prestamo-form">
        <label>Buscar libro por título:</label>
        <input
          type="text"
          placeholder="Título exacto del libro"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar Copias</button>
      </div>

      {copias.length > 0 && (
        <div className="prestamo-copias">
          <p><strong>Selecciona una copia disponible:</strong></p>
          <ul>
            {copias.map((copia) => (
              <li key={copia.id}>
                <label>
                  <input
                    type="radio"
                    name="bookCopy"
                    value={copia.id}
                    onChange={() => setBookCopyId(copia.id)}
                  />
                  Libro #{copia.book.id} — {copia.book.title} — {copia.book.author} — {copia.book.type} (Copia #{copia.id})
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mensaje && <p className="mensaje-success">{mensaje}</p>}
      {error && <p className="mensaje-error">{error}</p>}
    </div>
  );
};

export default PrestamoPage;