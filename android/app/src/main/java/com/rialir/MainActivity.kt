package com.rialir

import android.graphics.Color
import android.os.Build
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.i18nmanager.I18nUtil

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "rialir"

  // Required for react-navigation to work on Android
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null);

    window.navigationBarColor = Color.TRANSPARENT

    if (Build.VERSION_CODES.Q <= Build.VERSION.SDK_INT) {
      window.isNavigationBarContrastEnforced = false
    }
    val sharedI18nUtilInstance = I18nUtil.getInstance()
    sharedI18nUtilInstance.allowRTL(applicationContext, false)
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
