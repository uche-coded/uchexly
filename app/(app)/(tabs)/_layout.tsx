import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { 
  IonicTabBarIcon, 
  FontistoIcon,
  FontAwesomeIcon
} from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Profile',
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <IonicTabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="bike"
          options={{
            tabBarLabel: "Bike",
            title: "Bike",
            tabBarIcon: ({ color, focused }) => (
              <FontistoIcon name={focused ? 'motorcycle' : 'motorcycle'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="groups"
          options={{
            tabBarLabel: "Riding Groups",
            title: "Groups",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesomeIcon name={focused ? 'people-group' : 'people-group'} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
