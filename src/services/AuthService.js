import { Database } from './Database.js';

const SESSION_KEY = 'wlms_session';

export const AuthService = {
    login(email, password) {
        const users = Database.getUsers();
        // Simple Base64 match for demo security
        const hashedPassword = btoa(password);
        const user = users.find(u => u.email === email && u.password === hashedPassword);

        if (user) {
            // Don't store password in session
            const { password, ...safeUser } = user;
            localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
            return { success: true, user: safeUser };
        }
        return { success: false, message: 'Invalid credentials' };
    },

    register(name, email, password) {
        const users = Database.getUsers();
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already exists' };
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password: btoa(password),
            role: 'user' // Default role
        };

        users.push(newUser);
        Database.setUsers(users);

        return { success: true };
    },

    logout() {
        localStorage.removeItem(SESSION_KEY);
        window.location.reload();
    },

    getCurrentUser() {
        const data = localStorage.getItem(SESSION_KEY);
        return data ? JSON.parse(data) : null;
    },

    requireAuth() {
        const user = this.getCurrentUser();
        if (!user) {
            // Trigger event or redirect logic handled by UI
            return null;
        }
        return user;
    }
};
