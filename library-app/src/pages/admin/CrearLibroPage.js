import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearLibro } from '../../services/bookService';
import AuthContext from '../../context/AuthContext';

const CrearLibroPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('');
  const [mensaje, setMensaje] = useState('');

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearLibro({ title, author, type }, user.token);
      setMensaje('✅ Libro creado exitosamente');
      setTitle('');
      setAuthor('');
      setType('');
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al crear el libro');
    }
  };

  return (
    <div>
      <h2>Crear Libro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Autor:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>Tipo:</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <button type="submit">Crear Libro</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearLibroPage;