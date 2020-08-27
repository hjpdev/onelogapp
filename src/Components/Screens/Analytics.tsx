import React from 'react'
import { Text, View } from 'react-native'

import NavBar from '../NavBar'
import { ScreenStyles } from '../../Assets/Styles/Screen'

const AnalyticsScreen: React.FC = () => {
  return(
    <>
    <View style={ScreenStyles.container} testID={'analytics-screen'}>
      <Text style={ScreenStyles.text}>
        {'Analytics'}
      </Text>
    </View>
    <NavBar />
    </>
  )
}

export default AnalyticsScreen
