const isProd = import.meta.env.PROD;

export const API_URL = isProd ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;