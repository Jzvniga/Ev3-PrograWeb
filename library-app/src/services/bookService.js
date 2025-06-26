import axios from 'axios';


export const crearLibro = async (formData, token) => {
  const response = await axios.post('http://localhost:8087/book/new', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  });

  return response.data;
};

export const getLibros = async (token = null) => {
  const headers = token
    ? { Authorization: `Bearer ${token}`, withCredentials: true }
    : {};

  const response = await axios.get('http://localhost:8087/book/all', {
    headers,
  });

  return response.data;
};

export const buscarLibroPorTitulo = async (titulo, token) => {
  const response = await axios.get(`http://localhost:8087/book/find/${titulo}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  });
  return response.data;
};

export const getLibrosPorTipo = async (type) => {
  const response = await fetch(`http://localhost:8087/book/all/${type}`);
  if (!response.ok) {
    throw new Error('No se pudo obtener libros por tipo');
  }
  return response.json();
};

