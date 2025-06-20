import React, { useState } from 'react';
import { getMultasByEmail } from '../../services/fineService';
import { AlertCircle, DollarSign } from 'lucide-react';

const MultasPorLectorPage = () => {
  const [email, setEmail] = useState('');
  const [multas, setMultas] = useState([]);
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    setError('');
    setMultas([]);
    console.log("🔍 Enviando búsqueda de multas...");

    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).token : null;

    if (!token || !email) {
      setError('Debes ingresar un email y estar autenticado.');
      return;
    }

    try {
      const data = await getMultasByEmail(email, token);
      setMultas(data);
    } catch (err) {
      console.error(err);
      setError('❌ Error al obtener las multas');
    }
  };

  return (
    <div>
      <h2>Buscar Multas por Lector</h2>
      <input
        type="email"
        placeholder="Email del lector"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>

      {error && (
        <p style={{ color: 'red' }}>
          <AlertCircle size={20} /> {error}
        </p>
      )}

      {multas.length > 0 && (
        <ul>
          {multas.map((multa) => (
            <li key={multa.id}>
              <DollarSign color="orange" size={18} />
              <strong> {multa.descripcion}</strong> – {multa.monto} CLP –{' '}
              {multa.estado ? 'Activa' : 'Pagada'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultasPorLectorPage;