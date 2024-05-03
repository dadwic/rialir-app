/**
 * @format
 */

import {AppRegistry, I18nManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './i18n';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

AppRegistry.registerComponent(appName, () => App);
