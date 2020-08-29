import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

type NavBarProps = {
  navigation: {
    navigate: (screen: string) => void
  }
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const { navigation } = props

  return (
    <View style={Styles.navBar} testID={"nav-bar"}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Settings')} testID={'nav-link-settings'}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarSettings.png')} />
      </TouchableOpacity>        

      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Account')} testID={'nav-link-account'}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarAccount.png')} />
      </TouchableOpacity>        

      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Home')} testID={'nav-link-home'}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarHome.png')} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('NewReading')} testID={'nav-link-new-reading'}>
        <Image style={Styles.navBarImage} source={require('../Assets/Images/NavBarNewReading.png')} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Analytics')} testID={'nav-link-analytics'}>
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
