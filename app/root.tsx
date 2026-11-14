// react-router ya venia con el proyecto y sigue siendo el que arma las rutas y el HTML.
// isRouteErrorResponse solo lo usaba el ErrorBoundary, que por ahora esta comentado al final.
// import {
//   isRouteErrorResponse,
//   Links,
//   Meta,
//   Outlet,
//   Scripts,
//   ScrollRestoration,
// } from "react-router";

// https://www.youtube.com/watch?v=iPNt12IdbCU

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
//lo que reemplazamos lo dejamos comentado y no borrado, a proposito: asi se ve que habia
//useState lo necesitamos para crear el QueryClient una sola vez .
import { useState } from "react";
//MUI pone los componentes visuales. ThemeProvider reparte nuestro tema (colores, tipografia)
// y CssBaseline unifica los estilos base del navegador, asi todo se ve igual en cualquier lado.
import { CssBaseline, ThemeProvider } from "@mui/material";
//se encarga de los datos que vienen del servidor: los pide, los guarda en cache y reintenta si falla. Asi no armamos esa logica a mano en cada pantalla.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Route } from "./+types/root";

//tema  centralizado en shared/theme y se exporta como `theme` (minuscula).
import { theme } from "./shared/theme/theme";

//antes se cargaba app.css. Ahora los estilos base los pone MUI (CssBaseline + theme),

// import "./app.css";

//antes solo cargabamos la fuente Inter. Esto incluye el pedido a Material Symbols,
// que es la fuente de iconos que usan nuestros componentes.
// export const links: Route.LinksFunction = () => [
//   { rel: "preconnect", href: "https://fonts.googleapis.com" },
//   {
//     rel: "preconnect",
//     href: "https://fonts.gstatic.com",
//     crossOrigin: "anonymous",
//   },
//   {
//     rel: "stylesheet",
//     href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
//   },
// ];
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0..1,0&display=block",
  },
];

//Layout recibe `children`, que es todo lo que react-router mete adentro (la app entera). Layout no sabe que es, solo lo coloca dentro del <body>.
//por eso el tipo es React.ReactNode: cualquier cosa que React pueda pintar (elementos, texto, null...).
//la ventaja es que un solo marco HTML sirve para todas las pantallas sin tocarlo.
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="en"> cambiamos por accesibilidad
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

//antes App solo pintaba la ruta activa. Ahora la envolvemos con las dos piezas nuevas:
//- TanStack por fuera (datos) y MUI por dentro (estilos), de modo que cualquier pantalla pueda usar las dos sin configurar nada extra. react-router sigue haciendo lo suyo con <Outlet />.
// export default function App() {
//   return <Outlet />;
// }
export default function App() {
  //se crea una sola vez: el cache de las consultas vive mientras la pagina este abierta
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 60_000 } } }),
  );
  // las props sirven para "inyectar" cosas. QueryClientProvider recibe `client` y
  //ThemeProvider recibe `theme`; cada uno los reparte a todos sus hijos por contexto, asi ningun
  //componente de abajo tiene que pasarse el cache ni el tema de mano en mano (prop drilling).
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

//es lo que se ve unos instantes mientras la app termina de cargar en el navegador.
export function HydrateFallback() {
  return <p>Cargando…</p>;
}

// Este ErrorBoundary venia en la plantilla pero no forma parte de lo que queremos activo por ahora,
// asi que lo dejamos comentado. Si lo volvemos a usar, hay que descomentar tambien isRouteErrorResponse arriba.
// teoria: aca las props no las definimos nosotros, las tipa react-router. Route.ErrorBoundaryProps
// sale de ./+types/root, un archivo que se genera solo segun esta ruta, y trae `error` ya incluido.
// Viene como `unknown` porque puede ser cualquier cosa que alguien haya lanzado; por eso el codigo
// primero lo revisa (isRouteErrorResponse o instanceof Error) antes de leerle .status o .message.
// export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
//   let message = "Oops!";
//   let details = "An unexpected error occurred.";
//   let stack: string | undefined;
//
//   if (isRouteErrorResponse(error)) {
//     message = error.status === 404 ? "404" : "Error";
//     details =
//       error.status === 404
//         ? "The requested page could not be found."
//         : error.statusText || details;
//   } else if (import.meta.env.DEV && error && error instanceof Error) {
//     details = error.message;
//     stack = error.stack;
//   }
//
//   return (
//     <main className="pt-16 p-4 container mx-auto">
//       <h1>{message}</h1>
//       <p>{details}</p>
//       {stack && (
//         <pre className="w-full p-4 overflow-x-auto">
//           <code>{stack}</code>
//         </pre>
//       )}
//     </main>
//   );
// }
