import React, { useEffect, useState, useContext } from 'react';
import { getLibros } from '../../services/bookService';
import AuthContext from '../../context/AuthContext';

const HomePage = () => {
  const [libros, setLibros] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        if (!user || !user.token) {
          console.warn('⚠️ Usuario no autenticado');
          return;
        }

        const data = await getLibros(user.token);
        setLibros(data);
      } catch (error) {
        console.error('Error al cargar libros:', error);
      }
    };

    fetchLibros();
  }, [user]);

  return (
    <div className="container mt-5">
      <h2>Nuestra Colección de Libros</h2>
      <div className="row">
        {libros.map(libro => (
          <div key={libro.id} className="col-md-3">
            <div className="card mb-4">
            {libro.image ? (
              <img
                src={`data:image/jpeg;base64,${libro.image}`}
                className="card-img-top"
                alt={libro.title}
              />
            ) : (
              <div className="card-img-top bg-light text-center" style={{ height: '200px', lineHeight: '200px' }}>
                <span>Sin imagen</span>
              </div>
            )}
              <div className="card-body">
                <h5 className="card-title">{libro.title}</h5>
                <p className="card-text">{libro.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;