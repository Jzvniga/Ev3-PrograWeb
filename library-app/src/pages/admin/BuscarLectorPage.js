import React, { useState } from 'react';
import { buscarPrestamosPorEmail } from '../../services/bookingService';
import { getReaderDetails, toggleReaderState } from '../../services/readerService';
import { getMultasByEmail } from '../../services/fineService';
import './BuscarLectorPage.css';

const BuscarLectorPage = () => {
  const [email, setEmail] = useState('');
  const [prestamos, setPrestamos] = useState([]);
  const [lector, setLector] = useState(null);
  const [multas, setMultas] = useState([]);
  const [estadoLector, setEstadoLector] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState('');

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
    <div className="buscar-lector-container">
      <h2>🔍 Buscar Lector</h2>

      <div className="form-group">
        <label>Correo del lector:</label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button onClick={handleDatosLector}>Ver Datos</button>
        <button onClick={handleReservas}>Ver Reservas</button>
        <button onClick={handleMultas}>Ver Multas</button>
      </div>

      {error && <p className="error-message">❌ {error}</p>}

      {visible === 'lector' && lector && (
        <div className="lector-info">
          <h3>👤 Información del Lector</h3>
          <p><strong>Nombre:</strong> {lector.nombre ?? 'Desconocido'}</p>
          <p><strong>Correo:</strong> {lector.email ?? email}</p>
          <p>
            <strong>Estado:</strong> <span className={estadoLector === 'Activo' ? 'activo' : 'bloqueado'}>
              {estadoLector}
            </span>
            <button onClick={handleToggleEstado} className="toggle-btn">
              {estadoLector === 'Activo' ? 'Bloquear' : 'Desbloquear'}
            </button>
          </p>
        </div>
      )}

      {visible === 'reserva' && prestamos.length > 0 && (
        <div className="reservas-info">
          <h3>📚 Reservas</h3>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Fecha Préstamo</th>
              </tr>
            </thead>
            <tbody>
              {prestamos.map((p) => (
                <tr key={p.id}>
                  <td>{p.bookCopy?.book?.title ?? 'Desconocido'}</td>
                  <td>{p.bookCopy?.book?.author ?? 'Desconocido'}</td>
                  <td>{new Date(p.fechaInicio).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {visible === 'multa' && multas.length > 0 && (
        <div className="multas-info">
          <h3>💸 Multas</h3>
          <table>
            <thead>
              <tr>
                <th>Motivo</th>
                <th>Monto (CLP)</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {multas.map((multa) => (
                <tr key={multa.id}>
                  <td>{multa.descripcion ?? multa.motivo ?? 'Sin motivo'}</td>
                  <td>{multa.monto}</td>
                  <td>{multa.estado ? 'Activa' : 'Pagada'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuscarLectorPage;