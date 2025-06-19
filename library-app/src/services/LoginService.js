import axios from 'axios';

const API_URL = 'http://localhost:8087/auth/login'; 

const login = async (email, password) => {
  const response = await axios.post(API_URL, { email, password });
  return response.data; // debería contener token y rol
};

export default login;