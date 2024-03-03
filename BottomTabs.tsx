/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {useTheme} from '@react-navigation/native';
import {
  ActivityIndicator,
  Text,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const fontFamily = Platform.select({
  ios: 'Vazirmatn',
});

const HomeScreen = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setLoading] = useState(true);
  const [price, setPrice] = useState<any>({});

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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: 48,
        paddingRight: 48,
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.textStyle}>{price.try}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    ...Platform.select({
      ios: {
        fontFamily,
        fontWeight: 'bold',
        color: '#fff',
      },
    }),
  },
});

const OrderScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <WebView
      style={{
        marginTop: insets.top,
      }}
      source={{uri: 'https://www.rialir.com/'}}
    />
  );
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#CE0E2D',
      }}>
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
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
          tabBarLabelStyle: {fontWeight: 'bold', fontSize: 12},
          tabBarLabel: 'قیمت لحظه ای لیر',
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="currency-lira" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
