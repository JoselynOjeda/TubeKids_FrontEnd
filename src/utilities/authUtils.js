// src/authUtils.js
import { jwtDecode } from 'jwt-decode';

export const decodeToken = () => {
  const token = localStorage.getItem('token');
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
