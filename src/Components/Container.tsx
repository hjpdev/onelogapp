import React, { ReactElement } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import AccountScreen from './Screens/Account'
import AnalyticsScreen from './Screens/Analytics'
import HomeScreen from './Screens/Home'
import NewReadingScreen from './Screens/NewReading'
import SettingsScreen from './Screens/Settings'

interface ContainerProps {
  currentScreen: string
}

const screens = (currentScreen: string) => {
  const map: { [key: string]: ReactElement } = {
    account: <AccountScreen />,
    settings: <SettingsScreen />,
    home: <HomeScreen />,
    newReading: <NewReadingScreen />,
    analytics: <AnalyticsScreen />
  }

  return map[currentScreen]
}

const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
  const { currentScreen } = props

  return(
    <View style={Styles.containerView}>
      { screens(currentScreen) }
    </View>
  )
}

export default Container


const Styles = StyleSheet.create({
  containerView: {
    backgroundColor: '#ebebeb',
    height: Dimensions.get('window').height - 120, //96 In reality
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  containerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    color: 'black',
    fontSize: 28
  }
})
