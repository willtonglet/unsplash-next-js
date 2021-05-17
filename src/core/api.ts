import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: 'Client-ID gym7euSnpQTzbqf1ofupiSz90IEQBCNrexKY_HVVqjI',
  },
});

export default api;
