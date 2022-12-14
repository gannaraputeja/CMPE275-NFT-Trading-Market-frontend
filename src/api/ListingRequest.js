/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import BACKEND_URL from './config';

const API = axios.create({ baseURL: BACKEND_URL });

export const getAllNewListingsWithNewOffers = () => API.get('/api/v1/listing/getAllNewListingsWithNewOffers');

export const createListing = (data) => API.post('/api/v1/listing/createListing', data);
