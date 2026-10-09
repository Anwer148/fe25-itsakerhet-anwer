import { getApiUrl } from './utils.js';


export function setAuthToken(token) {
    sessionStorage.setItem('authToken', token);
}

export function getAuthToken() {
    return sessionStorage.getItem('authToken');
}

export function removeAuthToken() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('currentUser');
}

export function setCurrentUser(user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentUser() {
    const userStr = sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated() {
    return getAuthToken() !== null;
}


let inactivityTimer;
const TIMEOUT_MS = 15 * 60 * 1000; 

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    if (isAuthenticated()) {
        inactivityTimer = setTimeout(() => {
            alert("Du har loggats ut automatiskt på grund av inaktivitet.");
            handleLogout();
        }, TIMEOUT_MS);
    }
}


window.addEventListener('mousemove', resetInactivityTimer);
window.addEventListener('keypress', resetInactivityTimer);
window.addEventListener('click', resetInactivityTimer);
window.addEventListener('scroll', resetInactivityTimer);

export function initNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const currentUser = getCurrentUser();
    const token = getAuthToken();

    if (token) {
        navMenu.innerHTML = `
            <span>Välkommen, ${currentUser?.username || 'Användare'}!</span>
            <a href="#/dashboard">Dashboard</a>
            <button id="logout-btn">Logga ut</button>
        `;
        
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
        resetInactivityTimer(); 
    } else {
        navMenu.innerHTML = `
            <a href="#/login">Logga in</a>
            <a href="#/register">Registrera</a>
        `;
        clearTimeout(inactivityTimer); 
    }
}

export async function handleLogout() {
    removeAuthToken();
    sessionStorage.clear(); 
    window.location.hash = '/login';
    window.location.reload(); 
}