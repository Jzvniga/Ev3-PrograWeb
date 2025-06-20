import axios from 'axios';

export const crearCopiaDeLibro = async (bookId, token) => {
  const response = await axios.post('http://localhost:8087/book/newcopy', {
    bookId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });

  return response.data;
};

export const getCopiasDisponiblesPorLibro = async (bookId, token) => {
  const response = await axios.get(`http://localhost:8087/book/disponibles/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  });
  return response.data;
};