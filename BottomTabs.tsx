/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {ActivityIndicator, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [price, setPrice] = useState<any>();

  const getMovies = async () => {
    try {
      const response = await fetch(
        'https://www.rialir.com/wp-json/wp/v2/pricing',
      );
      const data = await response.json();
      setPrice(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? <ActivityIndicator /> : <Text>{price.try}</Text>}
    </View>
  );
};

const OrderScreen = () => {
  return <WebView source={{uri: 'https://www.rialir.com/'}} />;
};

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
          tabBarLabelStyle: {fontWeight: 'bold'},
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
          tabBarLabelStyle: {fontWeight: 'bold'},
          tabBarLabel: 'قیمت لحظه ای لیر',
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="currency-lira" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
