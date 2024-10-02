import { Text, View, Pressable } from 'react-native';
import { Stack } from 'expo-router';

export default function Page() {
  return (
    <>
      <View>
        <Stack.Screen options={{ headerShown: true, title: 'About us Page'}} />
        <Text>About Us Page!!!</Text>
      </View>
    </>

  )
   
}
