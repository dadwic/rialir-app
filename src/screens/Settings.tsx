/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getVersion} from 'react-native-device-info';
import {useTheme} from '@react-navigation/native';
import {ListItem} from '@rneui/themed';

export default function Settings() {
  const {colors} = useTheme();
  return (
    <View style={styles.view}>
      <ListItem
        topDivider
        bottomDivider
        containerStyle={{
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
        }}>
        <ListItem.Content>
          <ListItem.Title style={styles.text}>نسخه وب</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem
        topDivider
        bottomDivider
        containerStyle={{
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
        }}>
        <ListItem.Content>
          <ListItem.Title style={styles.text}>گزارش مشکل</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Text style={[styles.version, {color: 'grey'}]}>
        {'🚀'} نسخه {getVersion()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    direction: 'rtl',
  },
  version: {
    fontFamily: 'Vazirmatn',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
});
