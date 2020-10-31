import React from 'react'
import { Text, View } from 'react-native'

import ScreenStyles from '../../Assets/Styles/Screen'

const AnalyticsScreen: React.FC = () => {
  return(
    <>
    <View style={ScreenStyles.container} testID={'analytics-screen'}>
      <Text style={ScreenStyles.text}>
        {'Analytics'}
      </Text>
    </View>
    </>
  )
}

export default AnalyticsScreen
