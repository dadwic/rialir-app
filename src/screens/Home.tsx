/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, ListItem} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';
import moment from 'moment-jalaali';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {ccyFormat} from '../utils';

moment.loadPersian({usePersianDigits: true, dialect: 'persian-modern'});

export default function Home() {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [price, setPrice] = useState<any>({});

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetch(process.env.API_URL as string, {
      headers: {
        'x-api-key': process.env.API_KEY as string,
      },
    })
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
      style={{direction: 'rtl'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ListItem
        topDivider
        bottomDivider
        containerStyle={{
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
        }}>
        <Avatar
          rounded
          containerStyle={{backgroundColor: '#424242'}}
          icon={{name: 'currency-lira', type: 'material', size: 24}}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>TRY-IRT</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            لیر ترکیه به تومان
          </ListItem.Subtitle>
        </ListItem.Content>
        {price?.try_irt ? (
          <View style={styles.flex}>
            <Text style={[styles.buy, {color: colors.text}]}>
              {ccyFormat(price.try_irt.buy)}
            </Text>
            <Text style={[styles.sell, {color: colors.text}]}>
              {ccyFormat(price.try_irt.sell)}
            </Text>
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </ListItem>
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
        }}>
        <Avatar
          rounded
          title="$"
          titleStyle={styles.avatar}
          containerStyle={{backgroundColor: '#424242'}}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>USDT-IRT</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            تتر به تومان
          </ListItem.Subtitle>
        </ListItem.Content>
        {price?.usdt_irt ? (
          <View style={styles.flex}>
            <Text style={[styles.buy, {color: colors.text}]}>
              {ccyFormat(price.usdt_irt.buy)}
            </Text>
            <Text style={[styles.sell, {color: colors.text}]}>
              {ccyFormat(price.usdt_irt.sell)}
            </Text>
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </ListItem>
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
        }}>
        <Avatar
          rounded
          title="₮"
          titleStyle={styles.avatar}
          containerStyle={{backgroundColor: '#424242'}}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>USDT-TRY</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            تتر به لیر ترکیه
          </ListItem.Subtitle>
        </ListItem.Content>
        {price?.usdt_try ? (
          <View style={styles.flex}>
            <Text style={[styles.buy, {color: colors.text}]}>
              {price.usdt_try.buy}
            </Text>
            <Text style={[styles.sell, {color: colors.text}]}>
              {price.usdt_try.sell}
            </Text>
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </ListItem>
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
        }}>
        <Avatar
          rounded
          containerStyle={{backgroundColor: '#424242'}}
          icon={{name: 'currency-lira', type: 'material', size: 24}}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.text}>خرید کالا</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            لیر ترکیه به تومان
          </ListItem.Subtitle>
        </ListItem.Content>
        {price?.try_irt ? (
          <Text style={[styles.sell, {color: colors.text}]}>
            {ccyFormat(price.try_irt.buy)}
          </Text>
        ) : (
          <ActivityIndicator />
        )}
      </ListItem>
      {price?.updated_at && (
        <Text style={[styles.time, {color: 'grey'}]}>
          {'تاریخ بروزرسانی: '}
          {moment(price.updated_at).format('jD jMMMM jYYYY ساعت HH:mm')}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Vazirmatn',
    fontSize: 16,
  },
  title: {
    fontSize: 16,
  },
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
  flex: {
    display: 'flex',
  },
  sell: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buy: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    fontSize: 24,
  },
});
