import React from 'react';
import {useTranslation} from 'react-i18next';
import {useColorScheme, StyleSheet, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeMode, ThemeProvider, darkColors, lightColors} from '@rneui/themed';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import AppLayout from './src/AppLayout';

const linking = {
  prefixes: ['rialir://', 'https://rialir.com', 'https://*.rialir.com'],
  config: {
    screens: {
      Home: '*',
    },
  },
};

function App(): React.JSX.Element {
  const scheme = useColorScheme();
  const {i18n} = useTranslation();
  const direction = i18n.dir();
  const isRTL = direction === 'rtl';

  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer
        linking={linking}
        theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ThemeProvider
          theme={{
            mode: scheme as ThemeMode,
            darkColors,
            lightColors,
            components: {
              ListItem: () => ({
                containerStyle: {direction},
              }),
              ListItemButtonGroup: () => ({
                textStyle: {fontFamily: 'Vazirmatn-Medium'},
              }),
              ListItemSubtitle: () => ({
                style: [
                  {fontSize: 16},
                  isRTL ? {fontFamily: 'Vazirmatn-Bold'} : {fontWeight: 'bold'},
                ],
              }),
              Avatar: () => ({
                placeholderStyle: {
                  backgroundColor: 'transparent',
                },
                source: {
                  uri: 'data:image/png',
                },
              }),
            },
          }}>
          <AppLayout />
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItemSubtitle: {
    fontFamily: 'Vazirmatn-Bold',
    ...(Platform.OS === 'android' && {fontWeight: 'normal'}),
  },
});

export default App;
