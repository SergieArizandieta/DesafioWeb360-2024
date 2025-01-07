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


api.interceptors.response.use(
   (response) => response, // Si la respuesta es exitosa, simplemente continúa
   async (error) => {
     const originalRequest = error.config;
 
     // Verificar si el error es 401 y no es un intento de refrescar el token
     if (error.response?.status === 401 && !originalRequest._retry) {
       originalRequest._retry = true; // Marcar que esta solicitud está siendo reintentada
 
       try {
         // Hacer una petición al backend para obtener un nuevo token de acceso
         const { data } = await api.post('/auth/refreshToken');

         // Guardar el nuevo token de acceso en el almacenamiento local
         const setToken = useAuthStore.getState().setToken;
         setToken(data.AccJwt)
 
         // Reintentar la solicitud original
         return api(originalRequest);
       } catch (refreshError) {
         console.error('No se pudo refrescar el token:', refreshError);
         await api.post('/auth/logout');
         const logout = useAuthStore.getState().logout;
         logout();
         return Promise.reject(refreshError);
       }
     }
 
     // Si no es un error manejable, rechazarlo
     return Promise.reject(error);
   }
 );