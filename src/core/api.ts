import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: 'Client-ID WeuaqJ884Q4DmaGEMbEV-N-vqAOOU_QukT5E4njJaSI',
  },
});

export default api;
