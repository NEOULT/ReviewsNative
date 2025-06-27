import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                
                if (token) {
                    setToken(token);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (e) {
                console.error('Error retrieving token:', e);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    const saveItem = async (itemName, item ) => {
        try {
            await AsyncStorage.setItem(itemName, item);

            if (itemName === 'token')  setToken(item);
            
        } catch (e) {
            console.error('Error saving item:', e);
        }
    };

    const getItem = async (item) => {
        try {
            return await AsyncStorage.getItem(item);
        } catch (e) {
            console.error('Error getting item:', e);
            return null;
        }
    };

    const removeItem = async (item) => {
        try {
            await AsyncStorage.removeItem(item);

            if (item === 'token') setToken(null);
            
        } catch (e) {
            console.error('Error removing item:', e);
        }
    };

    const logIn = async(data) =>{

        if (!data) console.error('No data provided for login');

        console.log('Logging in with data:', data);
        
        await saveItem('token', data.token);
        router.replace('/movies');
        setIsLoggedIn(true);
    }

    const logOut = async() => {
        await removeItem('token');
        await removeItem('userId')
        router.replace('/login');
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, logIn, logOut, loading, saveItem, getItem, removeItem, token}}>
            {children}
        </AuthContext.Provider>
    );
}