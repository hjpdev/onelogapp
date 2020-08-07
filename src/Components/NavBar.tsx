import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

interface NavBarProps {
  setCurrentScreen: (screen: string) => any
}

export const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const { setCurrentScreen } = props

  return (
    <View style={Styles.navBar}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setCurrentScreen('settings')}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarSettings.png')} />
      </TouchableOpacity>        

      <TouchableOpacity activeOpacity={0.7} onPress={() => setCurrentScreen('account')}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarAccount.png')} />
      </TouchableOpacity>        

      <TouchableOpacity activeOpacity={0.7} onPress={() => setCurrentScreen('home')}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarHome.png')} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={() => setCurrentScreen('newReading')}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarNewReading.png')} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={() => setCurrentScreen('analytics')}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarAnalytics.png')} />
      </TouchableOpacity>
    </View>
  )
}

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
