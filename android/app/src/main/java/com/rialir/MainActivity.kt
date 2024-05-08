package com.rialir

import android.os.Bundle
import android.content.res.Configuration
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.i18nmanager.I18nUtil
import java.util.Locale

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "rialir"

  // Required for react-navigation to work on Android
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState);

    // Set default locale
    val locale = Locale("fa")
    Locale.setDefault(locale)

    val config = Configuration()
    config.locale = locale

    // Apply the locale configuration to the application context
    resources.updateConfiguration(config, resources.displayMetrics)
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
