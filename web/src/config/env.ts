export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL as string || "-";

export const URL_WITH_SLASH = FRONTEND_URL.endsWith('/') ? FRONTEND_URL : FRONTEND_URL + "/";