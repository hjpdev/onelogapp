import React from 'react'
import { Text, View } from 'react-native'

import { ScreenStyles } from '../../Assets/Styles/Screen'

export const AnalyticsScreen: React.FC = () => {
  return(
    <View style={ScreenStyles.container}>
      <Text style={ScreenStyles.text}>
        {'Analytics'}
      </Text>
    </View>
  )
}
