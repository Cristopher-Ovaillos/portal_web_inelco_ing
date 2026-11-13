import {Box, Chip, FormHelperText, FormLabel, Skeleton} from "@mui/material";
import {useController, type Control, type FieldValues, type Path} from 'react-hook-form'; // https://react-hook-form.com/docs/useform
import {Icono} from "./Icono";

type Props<T extends FieldValues> = {
  name: Path<T>; // para que react-hook-form sepa a que campo del formulario corresponde este componente
  control: Control<T>; // para que react-hook-form sepa a que formulario corresponde este componente
  titulo: string;
  opciones: { valor: string; texto: string }[];
  cargando?: boolean;
  ayuda?: string;
};


export function ChipsSeleccion<T extends FieldValues>({ name, control, titulo, opciones, cargando, ayuda }: Props<T>) {
  const { field, fieldState } = useController({ name, control });
  const seleccion: string[] = field.value ?? [];
  const alternar = (v: string) =>
    field.onChange(seleccion.includes(v) ? seleccion.filter((x) => x !== v) : [...seleccion, v]); //es para alternar la seleccion de un chip, si ya estaba seleccionado lo quita, si no estaba seleccionado lo agrega

  return (
    <Box component="fieldset" sx={{ border: 0, p: 0, m: 0 }}>
      <FormLabel component="legend" sx={{ mb: 1 }}>{titulo}</FormLabel>
      {cargando && <Skeleton height={36} />}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {opciones.map((o) => {
          const activo = seleccion.includes(o.valor);
          return (
            <Chip
              key={o.valor}
              label={o.texto}
              clickable
              aria-pressed={activo}
              onClick={() => alternar(o.valor)}
              icon={activo ? <Icono nombre="check" /> : undefined}
              variant={activo ? 'filled' : 'outlined'}
              sx={activo ? { bgcolor: '#FDECEC', color: 'primary.dark', border: 1, borderColor: 'primary.main', fontWeight: 600 } : undefined}
            />
          );
        })}
      </Box>
      {(fieldState.error || ayuda) && (
        <FormHelperText error={!!fieldState.error}>{fieldState.error?.message ?? ayuda}</FormHelperText>
      )}
    </Box>
  );
}



