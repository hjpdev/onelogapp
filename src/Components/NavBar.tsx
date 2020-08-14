import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

interface NavBarProps {
  setCurrentScreen: (screen: string) => void
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const { setCurrentScreen } = props

  return (
    <View style={Styles.navBar} testID={"nav-bar"}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setCurrentScreen('settings')} testID={'nav-link-settings'}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarSettings.png')} />
      </TouchableOpacity>        

      <TouchableOpacity activeOpacity={0.7} onPress={() => setCurrentScreen('account')} testID={'nav-link-account'}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarAccount.png')} />
      </TouchableOpacity>        

      <TouchableOpacity activeOpacity={0.7} onPress={() => setCurrentScreen('home')} testID={'nav-link-home'}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarHome.png')} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={() => setCurrentScreen('newReading')} testID={'nav-link-new-reading'}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarNewReading.png')} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={() => setCurrentScreen('analytics')} testID={'nav-link-analytics'}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarAnalytics.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default NavBar


const Styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    backgroundColor: 'black',
    height: 48
  },
  navBarImage: {
    height: 30,
    width: 30,
    tintColor: '#ebebeb'
  }
})
