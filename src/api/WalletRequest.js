/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import BACKEND_URL from './config';

const API = axios.create({ baseURL: BACKEND_URL });

export const nftDisplay = (userId) => API.get(`/api/v1/wallet/getALlNfts/${userId}`);

export const availableCurrency = (userId) => API.get(`/api/v1/wallet/getAllCurrencyAmounts/${userId}`);

export const currencyTransaction = (data) => API.post('/api/v1/currencyTransaction/createDepositOrWithdrawTransaction', data);

export const updateCurrency = (data) => API.post('/api/v1/wallet/updateCurrencyAmounts/', data);
