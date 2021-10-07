import React, { createContext, useContext, useState, useEffect } from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    // const [user] = useAuthState(auth);

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function login() {
        try {
            return await auth.signInAnonymously();
        } catch (message) {
            return alert(message);
        }
    }

    function logout() {
        return auth.signOut();
    }

    // useEffect(() => {

    //     if (user) {
    //         setCurrentUser(user);
    //     } else {
    //         setCurrentUser(null);
    //     }

    //     setLoading(false);
    // }, [user]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
