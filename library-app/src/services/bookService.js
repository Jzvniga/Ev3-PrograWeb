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

export const getLibros = async (token) => {
  const response = await axios.get('http://localhost:8087/book/all', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
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



