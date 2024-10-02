import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function GroupPage() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: true, title: 'Group Page'}} />
      <Text>Group Page!!!</Text>
    </View>
  )
}