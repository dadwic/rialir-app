/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Linking, Appearance} from 'react-native';
import {getVersion} from 'react-native-device-info';
import {useTheme} from '@react-navigation/native';
import {ListItem, Icon, Switch} from '@rneui/themed';

export default function Settings() {
  const {colors, dark} = useTheme();

  const toggleSwitch = () => {
    Appearance.setColorScheme(dark ? 'light' : 'dark');
  };

  const handlePress = (url: string) => async () => {
    await Linking.openURL(url);
  };

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
        <Icon name="dark-mode" />
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.text}>حالت تاریک</ListItem.Title>
        </ListItem.Content>
        <Switch value={dark} onValueChange={toggleSwitch} style={styles.ltr} />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={handlePress('https://www.rialir.com/')}
        containerStyle={{
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
        }}>
        <Icon name="language" />
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.text}>نسخه وب</ListItem.Title>
        </ListItem.Content>
        <Icon name="chevron-left" />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={handlePress('mailto:rialir.com@gmail.com')}
        containerStyle={{
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
        }}>
        <Icon name="report" />
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.text}>گزارش مشکل</ListItem.Title>
        </ListItem.Content>
        <Icon name="chevron-left" />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={handlePress('mailto:rialir.com@gmail.com')}
        containerStyle={{
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
        }}>
        <Icon name="alternate-email" />
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.text}>تماس با ما</ListItem.Title>
        </ListItem.Content>
        <Icon name="chevron-left" />
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
  ltr: {
    direction: 'ltr',
  },
  content: {
    paddingVertical: 4,
  },
  version: {
    fontFamily: 'Vazirmatn',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Vazirmatn',
  },
});
