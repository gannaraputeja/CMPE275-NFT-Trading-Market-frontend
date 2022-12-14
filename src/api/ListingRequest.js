/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import BACKEND_URL from './config';

const API = axios.create({ baseURL: BACKEND_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userObj')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userObj')).jwt}`;
  }
  return req;
});

export const getAllNewListingsWithNewOffers = () => API.get('/api/v1/listing/getAllNewListingsWithNewOffers');

export const createListing = (data) => API.post('/api/v1/listing/createListing', data);
