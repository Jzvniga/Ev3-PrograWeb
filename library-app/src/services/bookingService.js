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


export const buscarPrestamosPorEmail = async (email, token) => {
  const response = await axios.get(`http://localhost:8087/booking/find/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data;
};

export const getAllPrestamos = async (token) => {
  const response = await axios.get('http://localhost:8087/booking/all', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const devolverPrestamo = async (id, token) => {
  const response = await axios.post(`http://localhost:8087/booking/return/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

