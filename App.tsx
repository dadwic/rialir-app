import React from 'react';
import {useColorScheme, StyleSheet, I18nManager, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeMode, ThemeProvider, darkColors, lightColors} from '@rneui/themed';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import AppLayout from './src/AppLayout';

const isRTL = I18nManager.isRTL;

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
              ListItemSubtitle: () => ({
                style: [
                  {
                    fontWeight: 'bold',
                    fontSize: 16,
                  },
                  isRTL && styles.Vazirmatn,
                  isRTL && Platform.OS === 'android' && styles.normal,
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
  Vazirmatn: {
    fontFamily: 'Vazirmatn-Bold',
  },
  normal: {
    fontWeight: 'normal',
  },
});

export default App;
