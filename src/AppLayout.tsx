/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {Icon, Text} from '@rneui/themed';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useTranslation} from 'react-i18next';
import {HeaderTitle} from '@react-navigation/elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SettingsScreen from './screens/Settings';
import HomeScreen from './screens/Home';

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  const {t, i18n} = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const [isConnected, setConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelStyle: [
          isRtl && {fontFamily: 'Vazirmatn'},
          {fontWeight: '600', marginBottom: 4},
        ],
        tabBarIconStyle: [isRtl && {marginTop: 4}],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: props => (
            <HeaderTitle {...props}>
              <Icon
                size={16}
                style={{marginRight: 4}}
                containerStyle={{marginBottom: -1}}
                name={isConnected ? 'lock' : 'wifi-off'}
              />
              <Text>rialir.com</Text>
            </HeaderTitle>
          ),
          tabBarLabel: t('home.title'),
          headerTitleStyle: {fontWeight: 'bold', letterSpacing: 0.5},
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="currency-exchange" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: t('settings.title'),
          tabBarLabel: t('settings.title'),
          headerTitleStyle: [isRtl && {fontFamily: 'Vazirmatn'}],
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
