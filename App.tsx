import React from 'react';
import {useColorScheme} from 'react-native';
import {ThemeMode, ThemeProvider, darkColors, lightColors} from '@rneui/themed';
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
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ThemeProvider
        theme={{mode: scheme as ThemeMode, darkColors, lightColors}}>
        <AppLayout />
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
