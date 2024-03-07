import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {ThemeMode, ThemeProvider, darkColors, lightColors} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import BottomTabs from './BottomTabs';

function App(): React.JSX.Element {
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ThemeProvider
          theme={{mode: scheme as ThemeMode, darkColors, lightColors}}>
          <BottomTabs />
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
