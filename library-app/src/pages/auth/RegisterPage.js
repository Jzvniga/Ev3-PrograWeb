import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!user || user.role !== 'ADMIN') {
      setError('Acceso no autorizado');
      return;
    }

    if (!role) {
      setError('Debes seleccionar un rol');
      return;
    }

    const token = user.token;

    try {
      console.log("Registrando con rol:", role); // Debug opcional
      await axios.post('http://localhost:8087/auth/register', {
        email,
        password,
        roles: [role]
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMensaje('✅ Usuario creado exitosamente');
      setEmail('');
      setPassword('');
      setRole(''); // ahora se limpia bien sin forzar LECTOR por defecto
    } catch (err) {
      console.error(err);
      setError('❌ Error al registrar el usuario');
    }
  };

  return (
    <div>
      <h2>Registrar nuevo usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rol:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>Selecciona un rol</option>
            <option value="LECTOR">LECTOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegisterPage;