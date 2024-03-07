/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {Avatar, ListItem} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment-jalaali';
import {ccyFormat} from './utils';

moment.loadPersian({usePersianDigits: true, dialect: 'persian-modern'});

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [price, setPrice] = useState<any>({});

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetch('https://www.rialir.com/wp-json/wp/v2/pricing')
      .then(res => res.json())
      .then(data => setPrice(data))
      .catch(error => console.error(error))
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
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
        {price?.try_irt ? (
          <Text style={[styles.price, {color: colors.text}]}>
            {price.try_irt}
          </Text>
        ) : (
          <ActivityIndicator />
        )}
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
        {price?.usdt_irt ? (
          <Text style={[styles.price, {color: colors.text}]}>
            {ccyFormat(parseInt(price.usdt_irt, 10) / 10)}
          </Text>
        ) : (
          <ActivityIndicator />
        )}
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
        {price?.usdt_try ? (
          <Text style={[styles.price, {color: colors.text}]}>
            {price.usdt_try}
          </Text>
        ) : (
          <ActivityIndicator />
        )}
      </ListItem>
      {price?.time && (
        <Text style={[styles.time, {color: 'grey'}]}>
          {'تاریخ بروزرسانی: '}
          {moment.unix(price.time).format('jYYYY/jMM/jDD - HH:mm:ss')}
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: 'Vazirmatn',
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
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
      containerStyle={{
        marginTop: insets.top,
      }}
      startInLoadingState={true}
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
          headerTitleStyle: {fontWeight: 'bold', letterSpacing: 0.5},
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
