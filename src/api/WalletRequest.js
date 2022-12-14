/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import BACKEND_URL from './config';

const API = axios.create({ baseURL: BACKEND_URL });

export const getAllNfts = (userId) => API.get(`/api/v1/wallet/getAllNfts/${userId}`);

export const getAllCurrencies = (userId) => API.get(`/api/v1/wallet/getAllCurrencyAmounts/${userId}`);

export const currencyTransaction = (data) => API.post('/api/v1/currencyTransaction/createDepositOrWithdrawTransaction', data);

export const getAllListings = (userId) => API.get(`/api/v1/listing/getAllListings/${userId}`);
