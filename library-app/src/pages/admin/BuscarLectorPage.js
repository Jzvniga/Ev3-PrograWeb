import React, { useState } from 'react';
import { buscarPrestamosPorEmail } from '../../services/bookingService';
import { getReaderDetails, toggleReaderState } from '../../services/readerService';
import { getMultasByEmail } from '../../services/fineService';

const BuscarLectorPage = () => {
  const [email, setEmail] = useState('');
  const [prestamos, setPrestamos] = useState([]);
  const [lector, setLector] = useState(null);
  const [multas, setMultas] = useState([]);
  const [estadoLector, setEstadoLector] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(''); // puede ser 'reserva', 'lector', 'multa'

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const resetTodo = () => {
    setPrestamos([]);
    setLector(null);
    setMultas([]);
    setEstadoLector('');
    setError('');
  };

  const handleReservas = async () => {
    resetTodo();
    setVisible('reserva');
    try {
      const data = await buscarPrestamosPorEmail(email, token);
      setPrestamos(data);
    } catch (err) {
      setError('Error al buscar reservas');
    }
  };

  const handleDatosLector = async () => {
    resetTodo();
    setVisible('lector');
    try {
      const data = await getReaderDetails(email, token);
      setLector(data);
      setEstadoLector(data.estado ? 'Activo' : 'Bloqueado');
    } catch (err) {
      setError('Error al cargar datos del lector');
    }
  };

  const handleMultas = async () => {
    resetTodo();
    setVisible('multa');
    try {
      const data = await getMultasByEmail(email, token);
      setMultas(data);
    } catch (err) {
      setError('Error al obtener multas');
    }
  };

  const handleToggleEstado = async () => {
    try {
      await toggleReaderState(email, token);
      setEstadoLector(prev => (prev === 'Activo' ? 'Bloqueado' : 'Activo'));
    } catch (err) {
      setError('Error al cambiar estado del lector');
    }
  };

  return (
    <div>
      <h2>Busca Lector</h2>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={handleDatosLector}>DATOS LECTOR</button>
        <button onClick={handleReservas}>RESERVAS</button>
        <button onClick={handleMultas}>MULTAS</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {visible === 'lector' && lector && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Nombre:</strong> {lector.nombre ?? 'Desconocido'}</p>
          <p><strong>Correo:</strong> {lector.email ?? email}</p>
          <p>
            <strong>Estado Lector:</strong> {estadoLector}{' '}
            <button onClick={handleToggleEstado} style={{ marginLeft: '1rem' }}>
              {estadoLector === 'Activo' ? 'Bloquear' : 'Desbloquear'}
            </button>
          </p>
        </div>
      )}

      {visible === 'reserva' && prestamos.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Reservas</h3>
          <ul>
            {prestamos.map((p) => (
              <li key={p.id}>
                📚 <strong>{p.bookCopy?.book?.title ?? 'Desconocido'}</strong><br />
                ✍️ Autor: {p.bookCopy?.book?.author ?? 'Desconocido'}<br />
                📅 Fecha préstamo: {new Date(p.fechaInicio).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {visible === 'multa' && multas.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Multas</h3>
          <ul>
            {multas.map((multa) => (
              <li key={multa.id}>
                💸 Monto: ${multa.monto} - Motivo: {multa.motivo ?? 'Sin motivo'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BuscarLectorPage;