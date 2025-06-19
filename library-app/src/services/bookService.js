import axios from 'axios';

const API_URL = 'http://localhost:8087/book/new'; 


export const crearLibro = async (libroData, token) => {
  const response = await axios.post(API_URL, libroData, {
    headers: {
      Authorization: `Bearer ${token}`
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

