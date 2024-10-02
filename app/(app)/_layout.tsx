import { Tabs, Slot } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { IonicTabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import Logout from './logout';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <Drawer>
        <Drawer.Screen 
          name="(tabs)"
          options={{
            headerTitle: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ size, color, focused }) => (
              <IonicTabBarIcon name={focused ? 'home' : 'home-outline'} color={color} size={size} />
            )
          }}
        />
        <Drawer.Screen 
          name="settings"
          options={{
            headerTitle: 'Settings',
            drawerLabel: 'Settings',
            drawerIcon: ({ color, focused }) => (
              <IonicTabBarIcon name={focused ? 'settings-outline' : 'settings'} color={color} />
            )
          }}
        />
        {/* <Drawer.Screen 
          name="aboutUs"
          options={{
            headerTitle: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ color, focused }) => (
              <IonicTabBarIcon name={focused ? 'information-circle-outline' : 'information-circle'} color={color} />
            )
          }}
        /> */}
        <Drawer.Screen
          name="logout"
          // component={<Logout />}
          // listeners={({ navigation }) => ({ 
          //     state: (e) => {
          //       if (e.data.state.index === 3) {
          //           // 3 is index of logout item in drawer

          //           navigation.replace("Login")
          //       }
          //     }
          // })}
          options={{
            drawerIcon: ({ color, focused }) => (
              <IonicTabBarIcon name={focused ? 'exit-outline' : 'exit'} color={color} />
            )
          }}

        />
      </Drawer>
    </GestureHandlerRootView>

  );
}
