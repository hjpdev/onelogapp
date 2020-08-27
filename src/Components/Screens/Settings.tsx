import React from 'react'
import { Text, View } from 'react-native'

import NavBar from '../NavBar'
import { ScreenStyles } from '../../Assets/Styles/Screen'

const SettingsScreen: React.FC = () => {
  return(
    <>
    <View style={ScreenStyles.container} testID={'settings-screen'}>
      <Text style={ScreenStyles.text}>
        {'Settings'}
      </Text>
    </View>
    <NavBar />
    </>
  )
}

export default SettingsScreen
