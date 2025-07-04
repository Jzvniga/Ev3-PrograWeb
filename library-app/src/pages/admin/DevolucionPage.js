import React, { useState } from 'react';
import { buscarPrestamosPorEmail, devolverPrestamo } from '../../services/bookingService';
import './DevolucionPage.css';

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
    <div className="devolucion-container">
      <h2>Gestión de Devolución</h2>

      <div className="devolucion-form">
        <label>Email del lector:</label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="button-row">
          <button onClick={handleBuscar}>Buscar</button>
          <button onClick={handleDevolucion} className="devolver-btn">Devolver</button>
        </div>
      </div>

      {prestamos.length > 0 && (
        <div className="prestamo-lista">
          <p><strong>Selecciona el préstamo a devolver:</strong></p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Título</th>
                <th>Autor</th>
                <th>Tipo</th>
                <th>Copia</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
              </tr>
            </thead>
            <tbody>
              {prestamos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <input
                      type="radio"
                      name="prestamo"
                      value={p.id}
                      onChange={() => setPrestamoSeleccionado(p.id)}
                    />
                  </td>
                    <td>{p.title ?? '—'}</td>
                    <td>{p.author ?? '—'}</td>
                    <td>{p.type ?? '—'}</td>
                    <td>{p.copyId ?? '—'}</td>
                  <td>{p.fechaInicio ?? '—'}</td>
                  <td>{p.fechaFin ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {mensaje && <p className="mensaje-success">{mensaje}</p>}
      {error && <p className="mensaje-error">{error}</p>}
    </div>
  );
};

export default DevolucionPage;