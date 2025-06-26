import React, { useEffect, useState, useContext } from 'react';
import { getLibros } from '../../services/bookService';
import AuthContext from '../../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const [librosOriginales, setLibrosOriginales] = useState([]);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const token = user?.token || null;
        const data = await getLibros(token);
        setLibrosOriginales(data);
        setLibrosFiltrados(data);
      } catch (error) {
        console.error('Error al cargar libros:', error);
      }
    };

    fetchLibros();
  }, [user]);

  const handleBuscar = () => {
    const resultado = librosOriginales.filter((libro) => {
      const coincideTitulo =
        libro.title.toLowerCase().includes(filtroTitulo.toLowerCase()) ||
        libro.author.toLowerCase().includes(filtroTitulo.toLowerCase());

      const coincideTipo = filtroTipo === '' || libro.type === filtroTipo;

      return coincideTitulo && coincideTipo;
    });

    setLibrosFiltrados(resultado);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
        />
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="">Todos los tipos</option>
          <option value="Ficción">Ficción</option>
          <option value="Ciencia">Ciencia</option>
          <option value="Novela">Novela</option>
          <option value="Aventura">Aventura</option>
        </select>
        <button onClick={handleBuscar}>Buscar</button>
      </div>

      <h2 className="section-title">Nuestra Colección de Libros</h2>

      <div className="grid-libros">
        {librosFiltrados.length === 0 ? (
          <p style={{ marginTop: '2rem' }}>No se encontraron libros que coincidan con la búsqueda.</p>
        ) : (
          librosFiltrados.map((libro) => (
            <div className="libro-card" key={libro.id}>
              {libro.image ? (
                <img src={`data:image/jpeg;base64,${libro.image}`} alt={libro.title} />
              ) : (
                <div className="no-image">Sin imagen</div>
              )}
              <div className="libro-info">
                <h3>{libro.title}</h3>
                <p>{libro.author}</p>
                <span className="etiqueta">{libro.type}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;