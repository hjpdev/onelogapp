import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const MainHeader: React.FC = () => (
  <View style={Styles.mainHeaderView} testID="main-header">
    <Image source={require('../Assets/Images/Logo.png')} style={Styles.logo} />
    <Text style={Styles.mainHeaderText}>
      Onelog
    </Text>
  </View>
)

export default MainHeader

const Styles = StyleSheet.create({
  mainHeaderView: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%'
  },
  mainHeaderText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 24
  },
  logo: {
    tintColor: '#ebebeb',
    height: 24,
    width: 24
  }
})
