import axios from 'axios';

const API = axios.create({ baseURL: 'http://137.184.112.89:8080' });

export const logIn = (formData) => API.post('/api/v1/auth/login', formData);

export const signUp = (formData) => API.post('/api/v1/auth/signup', formData);
