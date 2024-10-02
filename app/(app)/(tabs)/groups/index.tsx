import { Text, View, StyleSheet } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Link, Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: "Group" }} />

      <View>
        <Text>On the group page!!!</Text>
        <Link href={"group/group-page"} style={{ marginTop: 16 }} >
          <Text>Go to Group page.</Text>
        </Link>
      </View>
    </>
  )
}