import React from 'react'
import { Text, View } from 'react-native'

import NavBar from '../NavBar'
import { ScreenStyles } from '../../Assets/Styles/Screen'

type SettingsScreenProps = {
  navigation: any
}

const SettingsScreen: React.FC<SettingsScreenProps> = (props: SettingsScreenProps) => {
  const { navigation } = props

  return(
    <>
    <View style={ScreenStyles.container} testID={'settings-screen'}>
      <Text style={ScreenStyles.text}>
        {'Settings'}
      </Text>
    </View>
    <NavBar navigation={navigation} />
    </>
  )
}

export default SettingsScreen
