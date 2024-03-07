import React from 'react';
import WebView from 'react-native-webview';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function Order() {
  const insets = useSafeAreaInsets();
  return (
    <WebView
      containerStyle={{
        marginTop: insets.top,
      }}
      startInLoadingState={true}
      source={{uri: 'https://www.rialir.com/'}}
    />
  );
}
