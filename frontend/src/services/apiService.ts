import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://myfrota.pt/api',
});
