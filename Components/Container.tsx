import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import { AccountScreen } from './Screens/Account'
import { AnalyticsScreen } from './Screens/Analytics'
import { HomeScreen } from './Screens/Home'
import { NewReadingScreen } from './Screens/NewReading'
import { SettingsScreen } from './Screens/Settings'

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const screens = (currentScreen: string) => {
  const map = {
    account: <AccountScreen />,
    settings: <SettingsScreen />,
    home: <HomeScreen />,
    newReading: <NewReadingScreen />,
    analytics: <AnalyticsScreen />
  }

  return map[currentScreen]
}

export const Container: React.FC = props => {
  const { currentScreen } = props

  return(
    <View style={Styles.containerView}>
      <Text style={Styles.containerText}>
        { screens(currentScreen) }
      </Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  containerView: {
    backgroundColor: '#ebebeb',
    height: deviceHeight-120, //96 In reality
    width: deviceWidth,
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
