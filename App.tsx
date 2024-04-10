import React from 'react';
import analytics from '@react-native-firebase/analytics';
import {StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeMode, ThemeProvider, darkColors, lightColors} from '@rneui/themed';
import {I18nextProvider} from 'react-i18next';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AppLayout from './src/AppLayout';
import i18n from './i18n';

function App(): React.JSX.Element {
  const scheme = useColorScheme();
  const routeNameRef = React.useRef<string>();
  const navigationRef = useNavigationContainerRef();

  return (
    <SafeAreaProvider style={styles.container}>
      <I18nextProvider i18n={i18n} defaultNS={'translation'}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.getCurrentRoute()?.name;
          }}
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.getCurrentRoute()?.name;

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}>
          <ThemeProvider
            theme={{mode: scheme as ThemeMode, darkColors, lightColors}}>
            <AppLayout />
          </ThemeProvider>
        </NavigationContainer>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
