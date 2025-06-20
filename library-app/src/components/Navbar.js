import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#eee', padding: '10px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Inicio</Link>
      <Link to="/about" style={{ marginRight: '10px' }}>Acerca</Link>

      {!user && (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
        </>
      )}

      {user?.role === 'ADMIN' && (
        <>
          <Link to="/register" style={{ marginRight: '10px' }}>Registrar Usuario</Link>
          <Link to="/admin/crear-libro" style={{ marginRight: '10px' }}>Crear Libro</Link>
          <Link to="/admin/prestamo" style={{ marginRight: '10px' }}>Registrar Préstamo</Link>
          <Link to="/admin/devolucion" style={{ marginRight: '10px' }}>Devoluciones</Link>
          <Link to="/admin/buscar-lector" style={{ marginRight: '10px' }}>Buscar Lector</Link>
          <Link to="/admin/multas-por-lector"style={{ marginRight: '10px' }}>Multas</Link>

        </>
      )}

      {user?.role === 'LECTOR' && (
        <>
          <Link to="/lector/libros" style={{ marginRight: '10px' }}>Libros</Link>
          <Link to="/lector/prestamos" style={{ marginRight: '10px' }}>Mis Préstamos</Link>
          <Link to="/lector/multas" style={{ marginRight: '10px' }}>Mis Multas</Link>
        </>
      )}

      {user && (
        <>
          <span style={{ marginLeft: '20px', marginRight: '10px' }}>
            Bienvenido {user.username || user.email}
          </span>
          <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
            Cerrar sesión
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;