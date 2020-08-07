import React from 'react'
import { Text, View } from 'react-native'

import { ScreenStyles } from '../../Assets/Styles/Screen'

export const SettingsScreen: React.FC = () => {
  return(
    <View style={ScreenStyles.containerView}>
      <Text style={ScreenStyles.containerText}>
        {'Settings'}
      </Text>
    </View>
  )
}
