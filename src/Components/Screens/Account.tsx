import React from 'react'
import { Text, View } from 'react-native'

import NavBar from '../NavBar'
import { ScreenStyles } from '../../Assets/Styles/Screen'

type AccountScreenProps = {
  navigation: any
}

const AccountScreen: React.FC<AccountScreenProps> = (props: AccountScreenProps) => {
  const { navigation } = props

  return(
    <>
    <View style={ScreenStyles.container} testID={'account-screen'}>
      <Text style={ScreenStyles.text}>
        {'Account'}
      </Text>
    </View>
    <NavBar navigation={navigation} />
    </>
  )
}

export default AccountScreen
