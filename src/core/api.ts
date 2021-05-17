import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: 'Client-ID pi6XKOG1yqtlVLCY-TOpLyYwaeurBNghidfNAHyoxdk',
  },
});

export default api;
