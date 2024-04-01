import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User state to store user information

    // Function to set user information after login
    const login = (userData) => {
        setUser(userData);
    };

    // Function to clear user information after logout
    const logout = () => {
        setUser(null);
    };

    // Function to check if the user is logged in
    const isLoggedIn = () => {
        return user !== null;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
