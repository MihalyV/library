const BASE_URL = 'http://localhost:8080/api';

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('library_token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const api = {
    login: async (email, password) => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Hiba a bejelentkezés során');
        }

        const data = await response.json();
        localStorage.setItem('library_token', data.token);
        localStorage.setItem('user_role', data.role);
        localStorage.setItem('user_email', data.email);
        localStorage.setItem('user_first_name', data.firstName);
        return data;
    },

    register: async (userData) => {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const contentType = response.headers.get("content-type");
        
        if (!response.ok) {
            if (contentType && contentType.includes("application/json")) {
                const error = await response.json();
                throw new Error(error.message || 'Hiba a regisztráció során');
            }
            throw new Error('Hiba a regisztráció során (Szerver hiba)');
        }

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        return { message: "Sikeres művelet" };
    },

    logout: () => {
        localStorage.removeItem('library_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_first_name');
        window.location.href = '/bejelentkezes';
    },

    getCurrentUser: async () => {
        const response = await fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) throw new Error('Nem sikerült a lekérés');
        return await response.json();
    },

    getItems: async () => {
        const response = await fetch(`${BASE_URL}/items`, {
            method: 'GET',
            headers: getHeaders(),
        });
        return await response.json();
    },

    borrowItem: async (itemId) => {
        const response = await fetch(`${BASE_URL}/loans/borrow/${itemId}`, {
            method: 'POST',
            headers: getHeaders(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Hiba a kölcsönzés során');
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return response.text();
    },

    getMyLoans: async () => {
        const response = await fetch(`${BASE_URL}/loans/my-loans`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) throw new Error('Nem sikerült a kölcsönzések lekérése');
        return await response.json();
    }
};