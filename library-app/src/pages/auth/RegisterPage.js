import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import './RegisterPage.css';

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

    try {
      await axios.post(
        'http://localhost:8087/auth/register',
        { email, password, roles: [role] },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setMensaje('✅ Usuario creado exitosamente');
      setEmail('');
      setPassword('');
      setRole('');
    } catch (err) {
      console.error(err);
      setError('❌ Error al registrar el usuario');
    }
  };

  return (
    <div className="register-container">
      <h2 className="titulo-registro">Registrar nuevo usuario</h2>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo">
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="campo">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="campo">
          <label>Rol:</label>
          <select value={role} onChange={e => setRole(e.target.value)} required>
            <option value="" disabled>Selecciona un rol</option>
            <option value="LECTOR">LECTOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button type="submit" className="btn-registrar">Registrar</button>
      </form>

      {mensaje && <p className="mensaje-exito">{mensaje}</p>}
      {error && <p className="mensaje-error">{error}</p>}
    </div>
  );
};

export default RegisterPage;