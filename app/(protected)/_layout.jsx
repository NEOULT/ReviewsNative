
import { Stack,Redirect } from 'expo-router';
import { useContext} from 'react';
import { AuthContext } from '../../context/authContext.jsx';
import { ActivityIndicator,View } from 'react-native';

export default function ProtectedLayout() {

  console.log(123, 'ProtectedLayout');
  

  const { isLoggedIn, token, loading } = useContext(AuthContext);
  
  const authInactive = true;
  console.log('AuthInactive:', (authInactive || isLoggedIn));

  console.log('Loading:', loading);
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // if (!isLoggedIn || !token) {
  //   return <Redirect href="/login" />;
  // }

  // Si está logueado y hay token, muestra las tabs
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );

  
}
