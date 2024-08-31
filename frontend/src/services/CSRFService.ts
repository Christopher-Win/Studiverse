
export default function getCookie(name: string): string | null {
    const csrfCookieName = 'csrftoken';
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
        const cookiePair = cookie.trim().split('=');
        if (cookiePair[0] === csrfCookieName) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null; // Return null if CSRF token not found in cookies
}


