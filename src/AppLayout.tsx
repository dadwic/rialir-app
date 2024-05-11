/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {Icon} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import {HeaderTitle} from '@react-navigation/elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from './screens/Settings';
import HomeScreen from './screens/Home';

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  const {t, i18n} = useTranslation();
  const direction = i18n.dir();
  const isRTL = direction === 'rtl';
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
        tabBarStyle: {
          direction,
          paddingBottom: 4,
        },
        tabBarLabelStyle: [
          {fontWeight: 'bold'},
          isRTL && {fontFamily: 'Vazirmatn-Bold'},
        ],
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleStyle: {fontWeight: 'bold', letterSpacing: 1},
          headerTitle: props => (
            <HeaderTitle {...props}>
              <Icon
                size={16}
                name={isConnected ? 'lock' : 'cloud-off'}
                style={{marginHorizontal: 4, marginBottom: -1}}
              />
              {isConnected ? 'rialir.com' : 'No Internet Connection'}
            </HeaderTitle>
          ),
          tabBarLabel: t('home.title'),
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
          headerTitleStyle: [isRTL && {fontFamily: 'Vazirmatn-Medium'}],
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
