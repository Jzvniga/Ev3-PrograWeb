import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // reutilizamos el estilo

const RegisterLectorPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8087/auth/register-lector', {
        email,
        password
      });
      setMensaje('✅ Registro exitoso. Ahora puedes iniciar sesión.');
      setTimeout(() => navigate('/login'), 2000); // espera 2s y redirige
    } catch (error) {
      setMensaje('❌ Error al registrar: ' + (error.response?.data || ''));
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Registro de Lectores</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Registrarme</button>

        {mensaje && <p className="error-message">{mensaje}</p>}
      </form>
    </div>
  );
};

export default RegisterLectorPage;