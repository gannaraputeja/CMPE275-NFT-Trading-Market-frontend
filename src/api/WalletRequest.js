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

export const getAllNfts = (userId) => API.get(`/api/v1/wallet/getAllNfts/${userId}`);

export const getAllCurrencies = (userId) => API.get(`/api/v1/wallet/getAllCurrencyAmounts/${userId}`);

export const currencyTransaction = (data) => API.post('/api/v1/currencyTransaction/createDepositOrWithdrawTransaction', data);

export const getAllListings = (userId) => API.get(`/api/v1/listing/getAllListings/${userId}`);

export const cancelListing = (listingId) => API.put(`/api/v1/listing/cancelListing/${listingId}`);

export const acceptOffer = (offerId) => API.post(`/api/v1/listing/acceptOffer/${offerId}`);
