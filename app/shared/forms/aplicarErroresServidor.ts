import type {FieldValues, Path,UseFormSetError} from 'react-hook-form'; // https://react-hook-form.com/docs/useform
import {ApiError} from '../api/httpClient';


//copiamos los errores por campo de un error 400 a los campos del form y devuelve un mensaje general
export function aplicarErroresServidor<T extends FieldValues> (error:unknown, setError: UseFormSetError<T>, mensajeGeneral: string): string {
    if(!(error instanceof ApiError)){
        //para errores conocidos de la api, el error es un ApiError, para otros errores (como problemas de red) no lo es
        return 'Error inesperado';
    }
    //si el error no es un 400, devolvemos un mensaje general
    for(const [campo, mensajes] of Object.entries(error.errors ?? {})){
        //path es un tipo de react-hook-form que representa la ruta a un campo dentro de los valores del formulario
        //esto es para cuando el campo es un objeto anidado, por ejemplo: {usuario: {nombre: 'Juan', apellido: 'Perez'}} y lo queremos marcar como error, el path sería 'usuario.nombre' o 'usuario.apellido'
        setError(campo as Path<T>, {type: 'server', message: mensajes.join(', ')});
    }
    return error.message;

    //return "";
}