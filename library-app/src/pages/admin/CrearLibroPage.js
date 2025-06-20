import React, { useState, useContext } from 'react';
import { crearLibro, buscarLibroPorTitulo } from '../../services/bookService';
import { crearCopiaDeLibro } from '../../services/bookCopyService';
import AuthContext from '../../context/AuthContext';

const CrearLibroPage = () => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('type', type);
    formData.append('image', image);

    try {
      await crearLibro(formData, user?.token);
      setMensaje('✅ Libro creado correctamente.');
    } catch (error) {
      console.error('Error al crear libro:', error);
      setMensaje('❌ Error al crear libro.');
    }
  };

  const handleBuscar = async () => {
    try {
      const libro = await buscarLibroPorTitulo(busqueda, user?.token);
      setResultados(libro ? [libro] : []);
    } catch (err) {
      console.error('Error en búsqueda:', err);
    }
  };

  const handleCrearCopia = async () => {
    if (!libroSeleccionado) return;
    try {
      await crearCopiaDeLibro(libroSeleccionado, user?.token);
      alert('✅ Copia creada exitosamente');
    } catch (err) {
      console.error('Error al crear copia:', err);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {/* Crear libro */}
      <div>
        <h2>Nuevo Libro</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" required />
          <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Autor" required />
          <input type="text" value={type} onChange={e => setType(e.target.value)} placeholder="Tipo" required />
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} required />
          <button type="submit">Crear</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </div>

      {/* Crear copia */}
      <div>
        <h2>Nueva Copia</h2>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Título exacto"
        />
        <button onClick={handleBuscar}>Buscar</button>
        <button onClick={handleCrearCopia}>Crear</button>

        <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
          {resultados.map((libro) => (
            <li key={libro.id}>
              <input
                type="radio"
                name="libro"
                value={libro.id}
                onChange={() => setLibroSeleccionado(libro.id)}
              />
              Libro #{libro.id}. {libro.title} – {libro.author} – {libro.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrearLibroPage;