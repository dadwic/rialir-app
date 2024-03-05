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
import moment from 'moment-jalaali';
import {ccyFormat} from './utils';

moment.loadPersian({usePersianDigits: true, dialect: 'persian-modern'});

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const {colors} = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [price, setPrice] = useState<any>({});

  const updateRates = async () => {
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
    updateRates();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <React.Fragment>
          <ListItem
            topDivider
            bottomDivider
            containerStyle={{
              direction: 'rtl',
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              borderBottomColor: colors.border,
            }}>
            <Avatar
              rounded
              title="₺"
              titleStyle={styles.avatar}
              containerStyle={{backgroundColor: 'grey'}}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.text}>TRY-IRT</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                لیر ترکیه به تومان
              </ListItem.Subtitle>
            </ListItem.Content>
            <Text style={[styles.price, {color: colors.text}]}>
              {price.try_irt}
            </Text>
          </ListItem>
          <ListItem
            bottomDivider
            containerStyle={{
              direction: 'rtl',
              backgroundColor: colors.card,
              borderBottomColor: colors.border,
            }}>
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
            <Text style={[styles.price, {color: colors.text}]}>
              {ccyFormat(parseInt(price.usdt_irt, 10) / 10)}
            </Text>
          </ListItem>
          <ListItem
            bottomDivider
            containerStyle={{
              direction: 'rtl',
              backgroundColor: colors.card,
              borderBottomColor: colors.border,
            }}>
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
            <Text style={[styles.price, {color: colors.text}]}>
              {price.usdt_try}
            </Text>
          </ListItem>
          <Text style={[styles.date, {color: 'grey'}]}>
            {'تاریخ بروزرسانی: '}
            {moment.unix(price.time).format('jYYYY/jMM/jDD - HH:mm:ss')}
          </Text>
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
  date: {
    fontFamily: 'Vazirmatn',
    textAlign: 'center',
    marginTop: 8,
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
