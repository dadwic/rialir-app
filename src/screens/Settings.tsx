/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Linking, Appearance} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {getVersion} from 'react-native-device-info';
import {ListItem, Icon, Switch} from '@rneui/themed';

export default function Settings() {
  const {colors, dark} = useTheme();
  const {t, i18n} = useTranslation();
  const isEn = i18n.language === 'en';
  const direction = isEn ? 'ltr' : 'rtl';

  const toggleSwitch = () => {
    Appearance.setColorScheme(dark ? 'light' : 'dark');
  };

  const handlePress = (url: string) => async () => {
    await Linking.openURL(url);
  };

  return (
    <View style={{direction}}>
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
          <ListItem.Title style={styles.text}>{t('darkMode')}</ListItem.Title>
        </ListItem.Content>
        <Switch value={dark} onValueChange={toggleSwitch} style={styles.ltr} />
      </ListItem>
      <ListItem
        topDivider
        bottomDivider
        containerStyle={{
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
        }}>
        <Icon name="translate" />
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.text}>زبان</ListItem.Title>
        </ListItem.Content>
        <ListItem.ButtonGroup
          buttons={['English', 'فارسی']}
          selectedIndex={+(i18n.language === 'en')}
          onPress={index => i18n.changeLanguage(index === 0 ? 'en' : 'fa')}
          selectedButtonStyle={{
            backgroundColor: colors.card,
          }}
          selectedTextStyle={{
            color: colors.text,
          }}
        />
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
      <Text style={[styles.version, {color: dark ? 'grey' : '#424242'}]}>
        {'🚀'} نسخه {getVersion()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
