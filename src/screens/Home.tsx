/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, ListItem} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';
import moment from 'moment-jalaali';
import {
  StyleSheet,
  Text,
  ScrollView,
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
}

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
