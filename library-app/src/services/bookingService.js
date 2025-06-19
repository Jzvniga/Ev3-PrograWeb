import axios from 'axios';

export const getMisPrestamos = async (token) => {
  const response = await axios.get('http://localhost:8087/booking/mine', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });
  return response.data;
};

export const crearPrestamo = async (prestamoData, token) => {
  const response = await axios.post('http://localhost:8087/booking/new', prestamoData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });
  return response.data;
};