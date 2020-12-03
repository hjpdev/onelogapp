import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import Colors from '../Assets/Styles/Colors'

const MainHeader: React.FC = () => (
  <View style={Styles.mainHeaderView} testID="main-header">
    <Image source={require('../Assets/Images/Logo.png')} style={Styles.logo} />
    <Text style={Styles.mainHeaderText}>Onelog</Text>
  </View>
)

export default MainHeader

const Styles = StyleSheet.create({
  mainHeaderView: {
    height: 68,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    width: '100%'
  },
  mainHeaderText: {
    textAlign: 'center',
    padding: 10,
    marginTop: 24,
    color: Colors.white,
    fontSize: 24
  },
  logo: {
    tintColor: Colors.lightGrey1,
    marginTop: 28,
    height: 24,
    width: 24
  }
})
