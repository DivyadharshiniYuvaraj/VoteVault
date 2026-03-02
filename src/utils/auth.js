// Simulated JWT and Auth Logic using localStorage

// const SECRET_KEY = "pulsepoll_jwt_secret";

// Helper to encrypt/encode data (Base64 for simulation)
const encodeToken = (payload) => {
    return btoa(JSON.stringify(payload));
};

// Helper to decrypt/decode data
const decodeToken = (token) => {
    try {
        return JSON.parse(atob(token));
    } catch (e) {
        return null;
    }
};

export const signup = (email, password, role) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.email === email)) {
        return { success: false, message: "Email already exists" };
    }

    const newUser = {
        id: Date.now().toString(),
        email,
        password, // In a real app, this would be hashed
        role
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
};

export const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return { success: false, message: "Invalid email or password" };
    }

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + 1000 * 60 * 60 * 24 // 24 hours expiry
    };

    const token = encodeToken(payload);
    localStorage.setItem('jwt_token', token);
    return { success: true, user: payload };
};

export const verifyToken = () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;

    const decoded = decodeToken(token);
    if (!decoded || Date.now() > decoded.exp) {
        localStorage.removeItem('jwt_token');
        return null;
    }

    return decoded;
};

export const logout = () => {
    localStorage.removeItem('jwt_token');
};
