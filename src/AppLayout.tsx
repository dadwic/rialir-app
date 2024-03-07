/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from './screens/Settings';
import OrderScreen from './screens/Order';
import HomeScreen from './screens/Home';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#CE0E2D',
      }}>
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: {fontWeight: 'bold', fontSize: 12},
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
          tabBarLabelStyle: {fontWeight: 'bold', fontSize: 12},
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
          tabBarLabelStyle: {fontWeight: 'bold', fontSize: 12},
          tabBarLabel: 'تنظیمات',
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
