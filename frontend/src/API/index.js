// Modules
import axios from 'axios';

// Endpoints
import Products from './endpoints/products';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const api = {
  instance,
  Products,
}

export default api;
