import React from 'react'
import { Text, View } from 'react-native'

import { ScreenStyles } from '../../Assets/Styles/Screen'

export const AccountScreen: React.FC = () => {
  return(
    <View style={ScreenStyles.container}>
      <Text style={ScreenStyles.text}>
        {'Account'}
      </Text>
    </View>
  )
}
