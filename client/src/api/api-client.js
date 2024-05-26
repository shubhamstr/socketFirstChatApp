import axios from 'axios';
import { BASE_URL } from '../constants';

const axiosClient = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axiosClient;
