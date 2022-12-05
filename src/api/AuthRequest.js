import axios from 'axios';
import BACKEND_URL from './config';

const API = axios.create({ baseURL: BACKEND_URL });

export const logIn = (formData) => API.post('/api/v1/auth/login', formData);

export const signUp = (formData) => API.post('/api/v1/auth/signup', formData);
