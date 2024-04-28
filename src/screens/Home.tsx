/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {Avatar, ListItem, Skeleton} from '@rneui/themed';
import {getVersion} from 'react-native-device-info';
import {useTheme} from '@react-navigation/native';
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
import {API_KEY, API_URL, HOME_AD} from '../config';

moment.loadPersian({usePersianDigits: true, dialect: 'persian-modern'});

const ccyFormat = (val: any) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function Home() {
  const {colors, dark} = useTheme();
  const {t, i18n} = useTranslation();
  const direction = i18n.dir();
  const isRtl = direction === 'rtl';
  const [price, setPrice] = useState<any>({});
  const [refreshing, setRefreshing] = useState(false);

  const handlePress = async (url: string) => {
    await Linking.openURL(url);
  };

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const res = await fetch(API_URL, {
        headers: {
          'Accept-Language': i18n.language,
          'x-api-key': API_KEY,
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
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
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
      style={{direction}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {refreshing ? (
        [...new Array(5)].map((_, key) => (
          <ListItem
            key={key}
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
            <Skeleton
              circle
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={32}
              height={32}
            />
            <ListItem.Content>
              <Skeleton
                LinearGradientComponent={LinearGradient}
                animation="wave"
                width={80}
                height={12}
              />
              <Skeleton
                LinearGradientComponent={LinearGradient}
                style={styles.mt8}
                animation="wave"
                width={120}
                height={12}
              />
            </ListItem.Content>
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              width={80}
              height={24}
            />
          </ListItem>
        ))
      ) : (
        <React.Fragment>
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
            {price?.try_irt ? (
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
            ) : (
              <ActivityIndicator />
            )}
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
            {price?.usdt_irt ? (
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
            ) : (
              <ActivityIndicator />
            )}
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
            {price?.usdt_try ? (
              <View>
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
              </View>
            ) : (
              <ActivityIndicator />
            )}
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
                {t('home.shopping')}
              </ListItem.Title>
              <ListItem.Subtitle
                style={[styles.subtitle, isRtl && styles.Vazirmatn]}>
                {t('home.try_irt')}
              </ListItem.Subtitle>
            </ListItem.Content>
            {price?.try_irt ? (
              <Text style={[styles.sell, {color: colors.text}]}>
                {ccyFormat(price.try_irt?.shop)}
              </Text>
            ) : (
              <ActivityIndicator />
            )}
          </ListItem>
          <BannerAd
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            unitId={__DEV__ ? TestIds.ADAPTIVE_BANNER : HOME_AD}
          />
          {price?.updated_at && (
            <Text
              style={[
                styles.mt8,
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
        </React.Fragment>
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
  mt8: {
    marginTop: 8,
  },
  time: {
    textAlign: 'center',
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
