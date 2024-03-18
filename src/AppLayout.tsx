/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from './screens/Settings';
import OrderScreen from './screens/Order';
import HomeScreen from './screens/Home';

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#CE0E2D',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          fontFamily: 'Vazirmatn',
        },
      }}>
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'خرید از ترکیه',
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="local-mall" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'rialir.com',
          headerTitleStyle: {fontWeight: 'bold', letterSpacing: 0.5},
          tabBarLabel: 'قیمت لحظه ای لیر',
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="currency-lira" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: 'تنظیمات',
          headerTitleStyle: {fontFamily: 'Vazirmatn'},
          tabBarLabel: 'تنظیمات',
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
