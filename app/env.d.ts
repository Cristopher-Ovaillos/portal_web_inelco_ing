// declara que variables existen.
// utilizacion: import.meta.env.VITE_*
// con typescript indicamos el tipo, asi que si hay un error de tipeo se detecta facilmente

interface ImportMetaEnv{
    readonly VITE_USERS_API_URL:string;
    readonly VITE_TICKETS_API_URL:string;
}

interface ImportMeta{
    readonly env: ImportMetaEnv;
}

