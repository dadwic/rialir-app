/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Icon, Text} from '@rneui/themed';
import {HeaderTitle} from '@react-navigation/elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
          fontWeight: '600',
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
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: props => (
            <HeaderTitle {...props}>
              <Icon
                name="lock"
                size={16}
                style={{marginRight: 4}}
                containerStyle={{marginBottom: -1}}
              />
              <Text>rialir.com</Text>
            </HeaderTitle>
          ),
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
