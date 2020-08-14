import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MainHeader: React.FC = () => {
  return (
    <View style={Styles.mainHeaderView} testID={'main-header'}>
      <Text style={Styles.mainHeaderText}>
        {'Onelog'}
      </Text>
    </View>
  )
}

export default MainHeader


const Styles = StyleSheet.create({
  mainHeaderView: {
    height: 48,
    justifyContent: 'center',
    backgroundColor: 'black',
    width: '100%'
  },
  mainHeaderText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 24,
    textDecorationLine: 'underline'
  }
})
