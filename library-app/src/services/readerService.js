import axios from 'axios';

export const getReaderDetails = async (email, token) => {
  const response = await axios.get(`http://localhost:8087/reader/find/${email}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const toggleReaderState = async (email, token) => {
  const response = await axios.put(`http://localhost:8087/reader/toggle/${email}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};