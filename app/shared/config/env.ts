import {z} from 'zod';
const esquema = z.object({
    VITE_USERS_API_URL: z.url('Falta la varaible VITE_USERS_API_URL en el env'),
    VITE_TICKETS_API_URL: z.url('Falta la varaible VITE_TICKETS_API_URL en el env'),
});

export const env = esquema.parse(import.meta.env);
/**
 * este archivo es para validar la configuracion al arrancar, y no mas tarde cuando se deploya
 */