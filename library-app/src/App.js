import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/general/HomePage';
import AboutPage from './pages/general/AboutPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RegisterLectorPage from './pages/auth/RegisterLectorPage';

import MisPrestamosPage from './pages/lector/MisPrestamosPage';
import MultasPage from './pages/lector/MultasPage';

import CrearLibroPage from './pages/admin/CrearLibroPage';
import PrestamoPage from './pages/admin/PrestamoPage';
import DevolucionPage from './pages/admin/DevolucionPage';
import BuscarLectorPage from './pages/admin/BuscarLectorPage';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        {/* General */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-lector" element={<RegisterLectorPage />} />
   

        {/* Lector */}
        <Route path="/lector/prestamos" element={
          <ProtectedRoute role="LECTOR">
            <MisPrestamosPage />
          </ProtectedRoute>
        } />
        <Route path="/lector/multas" element={
          <ProtectedRoute role="LECTOR">
            <MultasPage />
          </ProtectedRoute>
        } />

        {/* Admin */}
        <Route path="/register" element={
          <ProtectedRoute role="ADMIN">
            <RegisterPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/crear-libro" element={
          <ProtectedRoute role="ADMIN">
            <CrearLibroPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/prestamo" element={
          <ProtectedRoute role="ADMIN">
            <PrestamoPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/devolucion" element={
          <ProtectedRoute role="ADMIN">
            <DevolucionPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/buscar-lector" element={
          <ProtectedRoute role="ADMIN">
            <BuscarLectorPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;