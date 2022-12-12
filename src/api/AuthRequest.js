/* eslint-disable comma-dangle */
import axios from 'axios';
import BACKEND_URL from './config';

const API = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const logIn = (formData) => API.post('/api/v1/auth/local/login', formData);

export const signUp = (formData) => API.post('/api/v1/auth/local/signup', formData);

export const verifyEmail = (token) => API.post('api/v1/auth/validate/email', null, {
  params: { token }
});
