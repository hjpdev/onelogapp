import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

export const NavBar: React.FC = props => {
  const { setCurrentScreen } = props

  const handlePress = (screen: string) => {
    setCurrentScreen(screen)
  }

  return (
    <View style={Styles.navBar}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => handlePress('Settings')}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarSettings.png')} />
      </TouchableOpacity>        

      <TouchableOpacity activeOpacity={0.7} onPress={() => handlePress('Account')}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarAccount.png')} />
      </TouchableOpacity>        

      <TouchableOpacity activeOpacity={0.7} onPress={() => handlePress('Home')}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarHome.png')} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={() => handlePress('New Reading')}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarNewReading.png')} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={() => handlePress('Analytics')}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarAnalytics.png')} />
      </TouchableOpacity>
    </View>
  )
}

const Styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    height: 48
  },
  navBarImage: {
    height: 30,
    width: 30,
    tintColor: '#ebebeb'
  }
})
