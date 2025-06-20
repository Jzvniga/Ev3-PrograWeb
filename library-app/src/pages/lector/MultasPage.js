import React, { useEffect, useState } from 'react';
import { getMisMultas } from '../../services/fineService';
import { AlertTriangle } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const MultasPage = () => {
  const [multas, setMultas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMultas = async () => {
      const storedUser = localStorage.getItem('user');
      const token = storedUser ? JSON.parse(storedUser).token : null;

      let email = null;
      if (token) {
        try {
          const decoded = jwtDecode(token);
          email = decoded.sub;
        } catch (err) {
          console.error('Error al decodificar token:', err);
          setError('Token inválido');
          return;
        }
      }

      if (!token || !email) {
        setError('No estás autenticado');
        return;
      }

      try {
        const data = await getMisMultas(email, token);
        setMultas(data);
      } catch (err) {
        console.error(err);
        setError('Error al obtener tus multas');
      }
    };

    fetchMultas();
  }, []);

  return (
    <div>
      <h2>📄 Mis Multas</h2>
      {error && (
        <p style={{ color: 'red', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertTriangle color="red" />
          {error}
        </p>
      )}
      <ul>
        {multas.map((multa) => (
          <li key={multa.id}>
            💰 {multa.descripcion} — {multa.monto} CLP {multa.estado ? '(Activa)' : '(Pagada)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultasPage;