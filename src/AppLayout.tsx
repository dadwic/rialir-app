/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {Icon, Text} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import {HeaderTitle} from '@react-navigation/elements';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SettingsScreen from './screens/Settings';
import HomeScreen from './screens/Home';
import {I18nManager} from 'react-native';

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  const {t} = useTranslation();
  const isRTL = I18nManager.isRTL;
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
          isRTL && {fontFamily: 'Vazirmatn-Medium'},
          {fontWeight: '600', marginBottom: 4},
        ],
        tabBarIconStyle: [isRTL && {marginTop: 4}],
        headerTitleAlign: 'center',
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
                name={isConnected ? 'lock' : 'cloud-off'}
              />
              <Text>
                {isConnected ? 'rialir.com' : 'No Internet Connection'}
              </Text>
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
          headerTitleStyle: [isRTL && {fontFamily: 'Vazirmatn-Medium'}],
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
