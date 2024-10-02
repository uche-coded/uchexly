import { Text, View, StyleSheet } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Link, Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: "Bike" }} />
      <View>
        <Text>On the bike page!!!</Text>
        <Link href={"bike/bike-page"} style={{ marginTop: 16 }} >
          <Text>Go to bike page.</Text>
        </Link>
      </View>
    </>
  )
}