import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function BikePage() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: true, title: 'Bike Page'}} />
      <Text>Bike Page!!!</Text>
    </View>
  )
}