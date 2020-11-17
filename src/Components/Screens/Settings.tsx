import React from 'react'
import { Text, View } from 'react-native'

import ScreenStyles from '../../Assets/Styles/Screen'

const SettingsScreen: React.FC = () => (
  <>
    <View style={ScreenStyles.container} testID="settings-screen">
      <Text style={ScreenStyles.text}>
        Settings
      </Text>
    </View>
  </>
)

export default SettingsScreen
