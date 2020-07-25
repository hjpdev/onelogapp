import React from 'react'
import { Text, View } from 'react-native'

import { ScreenStyles } from '../../Assets/Styles/Screen'

export const NewReadingScreen: React.FC = () => {
  return(
    <View style={ScreenStyles.containerView}>
      <Text style={ScreenStyles.containerText}>
        {'New Reading'}
      </Text>
    </View>
  )
}
