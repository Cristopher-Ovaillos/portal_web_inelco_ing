import { MenuItem } from '@mui/material';
import type { FieldValues } from 'react-hook-form';
import { CampoTexto } from './CampoTexto';

type Opcion = { 
    valor: string; 
    texto: string 
};

/**
 * los selectores llenan sus opciones desde los catalogos
 * en nuestro base de datos nosotros tenemos identificado esas opciones con numeros, 
 * pero los select deveulve texto, lo que vamos a hacer es pasar ese texto a un numero antes de mandar el body de la peticion
 * esto por como funciona nuestra api, nuestras reglas.
 */


export function CampoSelect<T extends FieldValues>(
  props: React.ComponentProps<typeof CampoTexto<T>> & { opciones: Opcion[]; cargando?: boolean },
) {
  const { opciones, cargando, ...resto } = props;
  return (
    <CampoTexto {...resto} select disabled={cargando || resto.disabled}>
      {cargando && <MenuItem value="">Cargando…</MenuItem>}
      {opciones.map((o) => (
        <MenuItem key={o.valor} value={o.valor}>{o.texto}</MenuItem>
      ))}
    </CampoTexto>
  );
}