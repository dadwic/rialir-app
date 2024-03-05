/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {Avatar, ListItem} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setLoading] = useState(true);
  const [price, setPrice] = useState<any>({});

  const updateRate = async () => {
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
    updateRate();
  }, []);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <React.Fragment>
          <ListItem
            topDivider
            bottomDivider
            containerStyle={{direction: 'rtl', backgroundColor: colors.card}}>
            <Avatar
              rounded
              title="₺"
              titleStyle={styles.avatar}
              containerStyle={{backgroundColor: 'grey'}}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.text}>TRY</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                لیر ترکیه به تومان
              </ListItem.Subtitle>
            </ListItem.Content>
            <Text style={[styles.price, {color: colors.text}]}>
              {price.try}
            </Text>
          </ListItem>
          <ListItem
            bottomDivider
            containerStyle={{direction: 'rtl', backgroundColor: colors.card}}>
            <Avatar
              rounded
              title="$"
              titleStyle={styles.avatar}
              containerStyle={{backgroundColor: 'grey'}}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.text}>USDT-IRT</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                تتر به تومان
              </ListItem.Subtitle>
            </ListItem.Content>
            <Text style={[styles.price, {color: colors.text}]}>60,325</Text>
          </ListItem>
          <ListItem
            bottomDivider
            containerStyle={{direction: 'rtl', backgroundColor: colors.card}}>
            <Avatar
              rounded
              title="₮"
              titleStyle={styles.avatar}
              containerStyle={{backgroundColor: 'grey'}}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.text}>USDT-TRY</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                تتر به لیر ترکیه
              </ListItem.Subtitle>
            </ListItem.Content>
            <Text style={[styles.price, {color: colors.text}]}>31.994</Text>
          </ListItem>
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: 'Vazirmatn',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatar: {
    fontSize: 26,
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
