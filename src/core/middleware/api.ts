import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: 'Client-ID pi6XKOG1yqtlVLCY-TOpLyYwaeurBNghidfNAHyoxdk',
  },
});

const unsplash = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UNSPLASH_URL,
});

const apiRoute = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROUTE_URL,
});

export { api, unsplash, apiRoute };
