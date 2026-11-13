import {env} from '../config/env';
//import type {...} from '.ts' para importar interfaces definidas usar type
import type { ApiErrorBody,ApiSuccess } from './types';


/**
 * clase utilizada para la funcion que manejara nuestros solicitudes
 * servicios
 * funcion
 */

export class ApiError extends Error{
    constructor(public status: number, message:string, public errors?: Record<string, string[]>){
        super(message);
    }
}

export const servicios = {
  users: env.VITE_USERS_API_URL,
  tickets: env.VITE_TICKETS_API_URL,
};


export async function http<T>(url: string, init?: RequestInit): Promise<ApiSuccess<T>> {
  let res: Response;
  try{
    res = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } });
  }catch{
    //fetch solo falla asi cuando no hay red o el servidor esta apagado
    throw new ApiError(0, 'No se pudo conectar con el servidor.');
  }

  //el 429 y el 404 de una ruta inexistente no traen el formato comun, por eso el catch
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 429) throw new ApiError(429, 'Demasiados pedidos seguidos.');
    const error = body as ApiErrorBody | null;
    throw new ApiError(res.status, error?.message ?? `Error ${res.status}`, error?.errors);
  }
  return body as ApiSuccess<T>; //nuestra api devuelve ese formato, nuestro front simplemente respeta lo que ya conocemos
}



