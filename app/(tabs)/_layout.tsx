import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const {logueado, loading} = useAuth();

  if (loading) return null;

  if (!logueado) {
    return <Redirect href='../index' />;
  }

  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      } 
      }>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Logout',
          tabBarIcon: ({ color }) => <Entypo name="log-out" size={28} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="biblioteca"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="book-open-blank-variant" color={color} />,
        }}
      />

      <Tabs.Screen
        name="nuevoLibro"
        options={{
          title: 'Nuevo Libro',
          tabBarIcon: ({ color }) => <MaterialIcons name="add-circle" size={28} color={color} />, 
        }}
      />

      <Tabs.Screen
        name="wishList"
        options={{
          title: 'Wish list',
          tabBarIcon: ({ color }) => <MaterialIcons name="favorite" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="prestamos"
        options={{
          title: 'Prestamos',
          tabBarIcon: ({ color }) => <Ionicons name="people-sharp"  size={28} color={color} />,
        }}
      />
    </Tabs>

  );
}
