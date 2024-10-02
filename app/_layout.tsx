import { Text } from 'react-native';
import { useEffect } from 'react';
import { Redirect, Stack, useRouter, useSegments } from 'expo-router';
// import { NavigationContainer } from "@react-navigation/native";

// import { MainStackNavigator } from './navigation/StackNavigation';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/RegisterScreen';

import { AuthProvider, useAuth } from '@/context/AuthContext';

const StackLayout = () => {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {

    const inAuthGroup = segments[0] === "(app)";

    if (!authState?.authenticated && inAuthGroup) {
      router.replace('/');
    } else if (authState?.authenticated === true) {
      router.replace('/(app)/(tabs)/home');
    }
  }, [authState])

  return <Stack>
      {/* <Stack.Screen name="index" options={{headerShown: false}} /> */}
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="register" options={{headerShown: false}}/>
      <Stack.Screen name="(app)" options={{headerShown: false}} />
    </Stack>
}
// }

export default function AppLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  )
}
 