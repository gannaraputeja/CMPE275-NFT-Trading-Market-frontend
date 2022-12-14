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

export const getPersonalNFTs = (userId) => API.get(`/api/v1/wallet/getAllNfts/${userId}`);

export const createNFT = (data) => API.post('/api/v1/wallet/createNft', data);

export const buyNFT = (data) => API.post('/api/v1/wallet/buyNft', data);

export const makeOffer = (data) => API.post('/api/v1/listing/makeOffer', data);
