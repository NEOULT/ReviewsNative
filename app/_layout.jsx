import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import AuthProvider from '../context/authContext.jsx';
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular} from '@expo-google-fonts/poppins';
import { Roboto_400Regular, Roboto_300Light } from '@expo-google-fonts/roboto';
import { useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

function LayoutWithTheme() {

    SplashScreen.preventAutoHideAsync();

    const [loaded, error] = useFonts({
        Poppins_600SemiBold,
        Poppins_500Medium,
        Poppins_400Regular,
        Roboto_400Regular,
        Roboto_300Light,
    });

    useEffect(() => {
        if (loaded || error) {
        SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="(protected)" />
            </Stack>
            <StatusBar style={'light'} />
        </AuthProvider>
    );
}

export default function RootLayout() {
    return (
        <LayoutWithTheme />
    );
}
