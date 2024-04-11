/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Linking, Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ListItem, Icon, Switch} from '@rneui/themed';
import {getVersion} from 'react-native-device-info';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export default function Settings() {
  const {colors, dark} = useTheme();
  const {t, i18n} = useTranslation();
  const direction = i18n.dir();
  const chevron = direction === 'rtl' ? 'left' : 'right';

  const toggleSwitch = () => {
    Appearance.setColorScheme(dark ? 'light' : 'dark');
  };

  const handlePress = (url: string) => async () => {
    await Linking.openURL(url);
  };

  const storeData = async (index: number) => {
    const lng = index === 0 ? 'en' : 'fa';
    i18n.changeLanguage(lng);
    try {
      await AsyncStorage.setItem('language', lng);
    } catch (e) {}
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
          <ListItem.Title style={styles.text}>
            {t('settings.darkMode')}
          </ListItem.Title>
        </ListItem.Content>
        <Switch value={dark} onValueChange={toggleSwitch} style={styles.ltr} />
      </ListItem>
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
        }}>
        <Icon name="translate" />
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.text}>
            {t('settings.language')}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.ButtonGroup
          buttons={['English', 'فارسی']}
          onPress={storeData}
          selectedIndex={+(i18n.language === 'en')}
          selectedTextStyle={{color: colors.text}}
          innerBorderStyle={{color: colors.border}}
          containerStyle={{borderColor: colors.border}}
          buttonStyle={{backgroundColor: colors.background}}
          selectedButtonStyle={{backgroundColor: colors.card}}
          textStyle={{color: colors.primary, fontWeight: 'bold'}}
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
          <ListItem.Title style={styles.text}>
            {t('settings.web')}
          </ListItem.Title>
        </ListItem.Content>
        <Icon name={`chevron-${chevron}`} />
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
          <ListItem.Title style={styles.text}>
            {t('settings.report')}
          </ListItem.Title>
        </ListItem.Content>
        <Icon name={`chevron-${chevron}`} />
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
          <ListItem.Title style={styles.text}>
            {t('settings.contact')}
          </ListItem.Title>
        </ListItem.Content>
        <Icon name={`chevron-${chevron}`} />
      </ListItem>
      <Text style={[styles.version, {color: dark ? 'grey' : '#424242'}]}>
        {'🚀'} {t('settings.version')} {getVersion()}
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
