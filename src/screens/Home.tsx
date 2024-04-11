/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {getVersion} from 'react-native-device-info';
import {useTheme} from '@react-navigation/native';
import {Avatar, ListItem} from '@rneui/themed';
import {useTranslation} from 'react-i18next';
import throttle from 'lodash.throttle';
import moment from 'moment-jalaali';
import dayjs from 'dayjs';
import {
  Text,
  View,
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

moment.loadPersian({usePersianDigits: true, dialect: 'persian-modern'});

const ccyFormat = (val: any) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function Home() {
  const {colors, dark} = useTheme();
  const {t, i18n} = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const [price, setPrice] = useState<any>({});
  const [refreshing, setRefreshing] = useState(false);

  const handlePress = async (url: string) => {
    await Linking.openURL(url);
  };

  const fetchData = async () => {
    setRefreshing(true);
    const res = await fetch(process.env.API_URL as string, {
      headers: {
        'Accept-Language': i18n.language,
        'x-api-key': process.env.API_KEY as string,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setPrice(data);
      if (data?.appUpdate) {
        if (data.appUpdate?.minAppVersion !== getVersion()) {
          Alert.alert(
            data.appUpdate?.alertTitle,
            data.appUpdate?.alertMessage,
            [
              {
                style: 'cancel',
                text: data.appUpdate?.alertCancel,
              },
              {
                isPreferred: true,
                text: data.appUpdate?.alertButton,
                onPress: () =>
                  handlePress(
                    Platform.OS === 'ios'
                      ? data.appUpdate?.iosAppLink
                      : data.appUpdate?.androidAppLink,
                  ),
              },
            ],
          );
        }
      }
    } else {
      Alert.alert(data?.message);
    }
    setRefreshing(false);
  };

  const onRefresh = useCallback(
    throttle(fetchData, 60000, {
      trailing: false,
    }),
    [],
  );

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ScrollView
      style={{direction: i18n.dir()}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {price?.try_irt && (
        <ListItem
          topDivider
          bottomDivider
          containerStyle={[
            styles.listItem,
            {
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              borderBottomColor: colors.border,
            },
          ]}>
          <Avatar
            rounded
            containerStyle={{backgroundColor: '#424242'}}
            icon={{name: 'currency-lira', type: 'material', size: 24}}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>TRY-IRT</ListItem.Title>
            <ListItem.Subtitle
              style={[styles.subtitle, isRtl && styles.Vazirmatn]}>
              {t('home.try_irt')}
            </ListItem.Subtitle>
          </ListItem.Content>
          <View>
            <Text
              style={[
                styles.buy,
                {color: colors.text},
                !isRtl && styles.textEnd,
              ]}>
              {ccyFormat(price.try_irt?.buy)}
            </Text>
            <Text style={[styles.sell, {color: colors.text}]}>
              {ccyFormat(price.try_irt?.sell)}
            </Text>
          </View>
        </ListItem>
      )}
      {price?.usdt_irt && (
        <ListItem
          bottomDivider
          containerStyle={[
            styles.listItem,
            {
              backgroundColor: colors.card,
              borderBottomColor: colors.border,
            },
          ]}>
          <Avatar
            rounded
            title="$"
            titleStyle={{fontSize: 24}}
            containerStyle={{backgroundColor: '#424242'}}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>USDT-IRT</ListItem.Title>
            <ListItem.Subtitle
              style={[styles.subtitle, isRtl && styles.Vazirmatn]}>
              {t('home.usdt_irt')}
            </ListItem.Subtitle>
          </ListItem.Content>
          <View>
            <Text
              style={[
                styles.buy,
                {color: colors.text},
                !isRtl && styles.textEnd,
              ]}>
              {ccyFormat(price.usdt_irt?.buy)}
            </Text>
            <Text style={[styles.sell, {color: colors.text}]}>
              {ccyFormat(price.usdt_irt?.sell)}
            </Text>
          </View>
        </ListItem>
      )}
      <ListItem
        bottomDivider
        containerStyle={[
          styles.listItem,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}>
        <Avatar
          rounded
          title="$"
          titleStyle={{fontSize: 24}}
          containerStyle={{backgroundColor: '#424242'}}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>USDT-TRY</ListItem.Title>
          <ListItem.Subtitle
            style={[styles.subtitle, isRtl && styles.Vazirmatn]}>
            {t('home.usdt_try')}
          </ListItem.Subtitle>
        </ListItem.Content>
        <View>
          {price?.usdt_try ? (
            <>
              <Text
                style={[
                  styles.buy,
                  {color: colors.text},
                  !isRtl && styles.textEnd,
                ]}>
                {price.usdt_try?.buy}
              </Text>
              <Text style={[styles.sell, {color: colors.text}]}>
                {price.usdt_try?.sell}
              </Text>
            </>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ListItem>
      <ListItem
        bottomDivider
        containerStyle={[
          styles.listItem,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
          },
        ]}>
        <Avatar
          rounded
          containerStyle={{backgroundColor: '#424242'}}
          icon={{name: 'currency-bitcoin', type: 'material', size: 24}}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>BTC-USDT</ListItem.Title>
          <ListItem.Subtitle
            style={[styles.subtitle, isRtl && styles.Vazirmatn]}>
            {t('home.btc_usdt')}
          </ListItem.Subtitle>
        </ListItem.Content>
        {price?.btc_usdt ? (
          <Text style={[styles.sell, {color: colors.text}]}>
            {ccyFormat(price.btc_usdt)}
          </Text>
        ) : (
          <ActivityIndicator />
        )}
      </ListItem>
      {price?.try_irt && (
        <ListItem
          bottomDivider
          containerStyle={[
            styles.listItem,
            {
              backgroundColor: colors.card,
              borderBottomColor: colors.border,
            },
          ]}>
          <Avatar
            rounded
            containerStyle={{backgroundColor: '#424242'}}
            icon={{name: 'currency-lira', type: 'material', size: 24}}
          />
          <ListItem.Content>
            <ListItem.Title style={[styles.text, isRtl && styles.Vazirmatn]}>
              خرید کالا از ترکیه
            </ListItem.Title>
            <ListItem.Subtitle
              style={[styles.subtitle, isRtl && styles.Vazirmatn]}>
              لیر ترکیه به تومان
            </ListItem.Subtitle>
          </ListItem.Content>
          <Text style={[styles.sell, {color: colors.text}]}>
            {ccyFormat(price.try_irt?.shop)}
          </Text>
        </ListItem>
      )}
      {price?.updated_at && (
        <Text
          style={[
            styles.time,
            isRtl && styles.Vazirmatn,
            {color: dark ? 'grey' : '#424242'},
          ]}>
          {t('home.lastUpdate')}
          {isRtl
            ? moment(price.updated_at).format('jD jMMMM jYYYY [ساعت] H:mm')
            : dayjs(price.updated_at).format('MMM D, YYYY [at] H:mm')}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Vazirmatn: {
    fontFamily: 'Vazirmatn',
  },
  textEnd: {
    textAlign: 'right',
  },
  listItem: {
    height: 80,
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  sell: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buy: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
