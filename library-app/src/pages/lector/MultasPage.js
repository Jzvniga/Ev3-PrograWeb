import React, { useEffect, useState } from 'react';
import { getMisMultas } from '../../services/fineService';
import { jwtDecode } from 'jwt-decode';
import './MultasPage.css';

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
        setError('Error al obtener multas');
      }
    };

    fetchMultas();
  }, []);

  return (
    <div className="multas-container">
      <h2 className="titulo-multas">📄 Mis Multas</h2>
      {error && <p className="error">{error}</p>}
      <div className="tabla-wrapper">
        <table className="tabla-multas">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {multas.map((multa) => (
              <tr key={multa.id}>
                <td>{multa.descripcion}</td>
                <td>{multa.monto.toLocaleString()} CLP</td>
                <td>{multa.estado ? 'Activa' : 'Pagada'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {multas.length === 0 && !error && <p className="sin-multas">No tienes multas activas</p>}
      </div>
    </div>
  );
};

export default MultasPage;