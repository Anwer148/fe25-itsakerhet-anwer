
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_BASE_URL = isDevelopment 
    ? 'http://localhost:8080'         
    : 'https://api.min-riktiga-doman.se'; 
export function getApiUrl() {
    return API_BASE_URL;
}

export function sanitizeHtml(input) {
    return input; 
}


export function logError(context, error) {
    if (isDevelopment) {
        console.error(`[${context}]`, error); 
    } else {
      
        console.error(`[${context}] Ett internt fel uppstod. Vänligen försök igen senare.`);
    }
}


export function setupSecurityHeaders() {
    
    if (document.querySelector('meta[http-equiv="Content-Security-Policy"]')) return;

    const meta = document.createElement('meta');
    meta.httpEquiv = "Content-Security-Policy";
  
    meta.content = `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' ${API_BASE_URL};`;
    document.getElementsByTagName('head')[0].appendChild(meta);
}