import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="brand">
        Libro<span>Plus</span>
      </div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/about">Acerca</Link>
  

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register-lector">Registrarse</Link>
          </>
        )}

        {user?.role === 'ADMIN' && (
          <>
            <Link to="/register">Registrar Usuario</Link>
            <Link to="/admin/crear-libro">Crear Libro</Link>
            <Link to="/admin/prestamo">Registrar Préstamo</Link>
            <Link to="/admin/devolucion">Devoluciones</Link>
            <Link to="/admin/buscar-lector">Buscar Lector</Link>
          </>
        )}

        {user?.role === 'LECTOR' && (
          <>
            <Link to="/lector/prestamos">Mis Préstamos</Link>
            <Link to="/lector/multas">Mis Multas</Link>
          </>
        )}
      </div>

      {user && (
        <div className="navbar-user">
          <span>Bienvenido {user.username || user.email}</span>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
