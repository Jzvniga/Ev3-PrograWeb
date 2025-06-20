import axios from 'axios';

export const getMisMultas = async (email, token) => {
  if (!email || !token) {
    throw new Error('No autenticado o sin email');
  }

  const response = await axios.get(`http://localhost:8087/fine/find/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });

  return response.data;
};

export const getMultasByEmail = async (email, token) => {
  if (!email || !token) {
    throw new Error('Email y token requeridos');
  }

  const response = await axios.get(`http://localhost:8087/fine/find/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });

  return response.data;
};