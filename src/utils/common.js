// odebranie danych o użytkowniku z sessionStorage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

// pobranie tokena
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// usunięcie użytkownika i tokena z sesji 
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}

// ustawienie tokenu i użytkownika w sessionStorage
export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
}