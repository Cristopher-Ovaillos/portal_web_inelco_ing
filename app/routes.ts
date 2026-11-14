/**
 * asi estaba antes
 * 
* import { type RouteConfig, index } from "@react-router/dev/routes";
*
* export default [index("routes/home.tsx")] satisfies RouteConfig;
*/


//este archivo es post piezas conectadas 
//lo que necesitamos es decirle a la app en q url vive cada pantalla y compartir la misma cabecera

import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

//unimos cada url con el archivo de su pagina
//esto lo hacemos por usamos la screaming architecture, donde buscamos que sea por modulo y cada modulo no accesa a otro porque si
export default [
  layout('shared/layout/AppLayout.tsx', [
    index('shared/layout/Inicio.tsx'),
    route('consultas/nueva', 'modules/consultas/pages/CrearConsultaPage.tsx'),
    route('clientes/nuevo', 'modules/clientes/pages/AltaClientePage.tsx'),
    route('equipo', 'modules/empleados/pages/GestionEquipoPage.tsx'),
  ]),
  
] satisfies RouteConfig;
//regla es route(url, archivo) - une la url y el archivo de pagina
//route config lo que se importa, es un tipo con satisfies lo que hace typescript es co mprobar q la lista tenga la forma correcta sin cambiar el tipo
//lo que buscamos es exportar una lista, para reactrouter lo lea al arrancar. 
//todo lo queesta dentro de layout se dibuja dentro del outlet de applayout 

// Cada URL apunta a la pagina de su módulo.