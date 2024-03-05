import React from 'react';
import {useColorScheme} from 'react-native';
import {ThemeMode, ThemeProvider, darkColors, lightColors} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import BottomTabs from './BottomTabs';

export default function App(): React.JSX.Element {
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ThemeProvider
          theme={{mode: scheme as ThemeMode, darkColors, lightColors}}>
          <BottomTabs />
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
