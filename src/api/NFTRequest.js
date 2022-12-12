/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import BACKEND_URL from './config';

const API = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getPersonalNFTs = (userId) => API.get(`/api/v1/wallet/getALlNfts/${userId}`);

export const createNFT = (data) => API.post('/api/v1/wallet/createNft', data);
