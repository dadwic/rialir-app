import React from 'react';
import {useColorScheme, StyleSheet, I18nManager} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeMode, ThemeProvider, darkColors, lightColors} from '@rneui/themed';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import AppLayout from './src/AppLayout';

const isRTL = I18nManager.isRTL;

function App(): React.JSX.Element {
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ThemeProvider
          theme={{
            mode: scheme as ThemeMode,
            darkColors,
            lightColors,
            components: {
              ListItemSubtitle: () => ({
                style: {
                  fontWeight: 'bold',
                  fontSize: 16,
                  ...(isRTL && {
                    fontWeight: 'normal',
                    fontFamily: 'Vazirmatn-Bold',
                  }),
                },
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
});

export default App;
