import axios from 'axios';

const unsplash = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UNSPLASH_URL,
});

const apiRoute = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROUTE_URL,
});

export { unsplash, apiRoute };
