import axios from 'axios';
import { useAuthStore } from '../storage/auth';
const urlApi =  import.meta.env.VITE_API;

export const api = axios.create({
   baseURL: urlApi,
   withCredentials: true,
});

api.interceptors.request.use(config => {
   const token = useAuthStore.getState().token;
   config.headers = {
      Authorization: `Bearer ${token}`,
   }
   return config;
});


