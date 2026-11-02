// Único lugar que lê variáveis de ambiente do front.
// CRA: REACT_APP_*  |  Vite: troque por import.meta.env.VITE_*
// NUNCA coloque GITHUB_TOKEN aqui: tudo que está no bundle é público.
export const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:5555/api';
export const GITHUB_USER = 'clcmo';
export const SITE = 'https://camilaloliveira.com';
