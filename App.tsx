import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './BottomTabs';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}

export default App;
