import { Dimensions, StyleSheet } from 'react-native'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export const ScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    height: deviceHeight-120,
    width: deviceWidth,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    color: 'black'
  }
})
