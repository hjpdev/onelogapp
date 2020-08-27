import React from 'react'
import { Text, View } from 'react-native'

import NavBar from '../NavBar'
import { ScreenStyles } from '../../Assets/Styles/Screen'

const AccountScreen: React.FC = () => {
  return(
    <>
    <View style={ScreenStyles.container} testID={'account-screen'}>
      <Text style={ScreenStyles.text}>
        {'Account'}
      </Text>
    </View>
    <NavBar />
    </>
  )
}

export default AccountScreen
