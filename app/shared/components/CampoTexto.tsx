import { TextField, type TextFieldProps } from "@mui/material"; 
// https://mui.com/material-ui/react-text-field/

import {useController, type Control, type FieldValues, type Path} from 'react-hook-form'; // https://react-hook-form.com/docs/useform

/**
 * unimos un campo de MUI con react-hook-form. 
 * cumple con WCAG 3.3.1 y 3.3.2 en un solo lugar
 * Error en texto junto al campo: helperText. MUI lo enlaza al campo con aria-describedby y marca aria-invalid cuando hay error.
 * Ayuda: el texto de ayuda se muestra mientras no haya error.


 * inputRef={field.ref} es necesario porque MUI pone el ref común en el contenedor y no en el input. Sin esto, el foco no va al campo con error.

 */

//esto es apra 
type Props<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    ayuda?: string;

} & Omit<TextFieldProps, 'name' | 'error'|'helperText'>; //omitimos name, error y helperText porque los vamos a manejar nosotros


export function CampoTexto<T extends FieldValues>({name, control, ayuda, ...props}: Props<T>) {
    const {field, fieldState} = useController({name, control}); //useController nos da el objeto field que tiene onChange, onBlur, value y ref para pasar al input, y fieldState que tiene error y isTouched
    return(
        <TextField
            {...props}
            {...field}
            value={field.value ?? ''} //si el valor es undefined, lo mostramos como string vacio para que no rompa el input
            inputRef={field.ref}
            error={!!fieldState.error} //si hay error, mostramos el input en rojo
            helperText={fieldState.error?.message ?? ayuda} //si hay error, mostramos el mensaje de error, sino mostramos la ayuda
            fullWidth //para que el input ocupe todo el ancho del contenedor
        />
    );
}