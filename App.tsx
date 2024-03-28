import React from 'react';
import analytics from '@react-native-firebase/analytics';
import {StyleSheet, useColorScheme} from 'react-native';
import {ThemeMode, ThemeProvider, darkColors, lightColors} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AppLayout from './src/AppLayout';

function App(): React.JSX.Element {
  const scheme = useColorScheme();
  const routeNameRef = React.useRef<string>();
  const navigationRef = useNavigationContainerRef();

  return (
    <SafeAreaProvider style={styles.container}>
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
