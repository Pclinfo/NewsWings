// Correct import from jwt-decode package
import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token); // decode JWT
    const currentTime = Date.now() / 1000; // current time in seconds
    return decoded.exp < currentTime; // true if expired
  } catch (error) {
    return true; // if decoding fails, assume token is expired
  }
};

export default isTokenExpired;
