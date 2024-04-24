/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {StyleSheet, View, Text, Linking, Appearance} from 'react-native';
import {ListItem, Icon, Switch} from '@rneui/themed';
import {getVersion} from 'react-native-device-info';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {SETTINGS_AD} from '../config';

export default function Settings() {
  const {colors, dark} = useTheme();
  const {t, i18n} = useTranslation();
  const direction = i18n.dir();
  const isRtl = i18n.dir() === 'rtl';
  const chevron = isRtl ? 'left' : 'right';

  const toggleSwitch = () => {
    Appearance.setColorScheme(dark ? 'light' : 'dark');
  };

  const handlePress = (url: string) => async () => {
    await Linking.openURL(url);
  };

  const handleChangeLanguage = async (index: number) => {
    const lng = index === 0 ? 'en' : 'fa';
    i18n.changeLanguage(lng);
    try {
      await AsyncStorage.setItem('language', lng);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{direction}}>
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
        <Icon name="dark-mode" />
        <ListItem.Content>
          <ListItem.Title style={[styles.text, isRtl && styles.Vazirmatn]}>
            {t('settings.darkMode')}
          </ListItem.Title>
        </ListItem.Content>
        <Switch value={dark} onValueChange={toggleSwitch} style={styles.ltr} />
      </ListItem>
      <ListItem
        bottomDivider
        containerStyle={[
          styles.listItem,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            borderBottomColor: colors.border,
          },
        ]}>
        <Icon name="translate" />
        <ListItem.Content>
          <ListItem.Title style={[styles.text, isRtl && styles.Vazirmatn]}>
            {t('settings.language')}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.ButtonGroup
          buttons={['English', 'فارسی']}
          onPress={handleChangeLanguage}
          selectedIndex={+(i18n.language === 'en')}
          textStyle={{color: colors.primary}}
          selectedTextStyle={{color: colors.text}}
          innerBorderStyle={{color: colors.border}}
          containerStyle={{
            borderColor: colors.border,
            backgroundColor: colors.card,
          }}
          buttonStyle={{backgroundColor: colors.background}}
          selectedButtonStyle={{backgroundColor: colors.card}}
        />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={handlePress('https://app.rialir.com/')}
        containerStyle={[
          styles.listItem,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            borderBottomColor: colors.border,
          },
        ]}>
        <Icon name="language" />
        <ListItem.Content>
          <ListItem.Title style={[styles.text, isRtl && styles.Vazirmatn]}>
            {t('settings.web')}
          </ListItem.Title>
        </ListItem.Content>
        <Icon name={`chevron-${chevron}`} />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={handlePress('mailto:rialir.com@gmail.com')}
        containerStyle={[
          styles.listItem,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            borderBottomColor: colors.border,
          },
        ]}>
        <Icon name="report" />
        <ListItem.Content>
          <ListItem.Title style={[styles.text, isRtl && styles.Vazirmatn]}>
            {t('settings.report')}
          </ListItem.Title>
        </ListItem.Content>
        <Icon name={`chevron-${chevron}`} />
      </ListItem>
      <ListItem
        bottomDivider
        onPress={handlePress('mailto:rialir.com@gmail.com')}
        containerStyle={[
          styles.listItem,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            borderBottomColor: colors.border,
          },
        ]}>
        <Icon name="alternate-email" />
        <ListItem.Content>
          <ListItem.Title style={[styles.text, isRtl && styles.Vazirmatn]}>
            {t('settings.contact')}
          </ListItem.Title>
        </ListItem.Content>
        <Icon name={`chevron-${chevron}`} />
      </ListItem>
      <BannerAd
        unitId={SETTINGS_AD}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
      <Text
        style={[
          styles.version,
          isRtl && styles.Vazirmatn,
          {color: dark ? 'grey' : '#424242'},
        ]}>
        {'🚀'} {t('settings.version')} {getVersion()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    height: 64,
  },
  Vazirmatn: {
    fontFamily: 'Vazirmatn',
  },
  ltr: {
    direction: 'ltr',
  },
  version: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
});
