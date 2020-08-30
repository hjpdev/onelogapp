import React from 'react'
import { Text, View } from 'react-native'

import NavBar from '../NavBar'
import { ScreenStyles } from '../../Assets/Styles/Screen'

type AnalyticsScreenProps = {
  navigation: any
}

const AnalyticsScreen: React.FC<AnalyticsScreenProps> = (props: AnalyticsScreenProps) => {
  const { navigation } = props

  return(
    <>
    <View style={ScreenStyles.container} testID={'analytics-screen'}>
      <Text style={ScreenStyles.text}>
        {'Analytics'}
      </Text>
    </View>
    <NavBar navigation={navigation} />
    </>
  )
}

export default AnalyticsScreen
