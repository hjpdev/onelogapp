import { Dimensions, StyleSheet } from 'react-native'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export const ScreenStyles = StyleSheet.create({
  containerView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#ebebeb',
    height: deviceHeight-120,
    width: deviceWidth,
  },
  containerText: {
    fontSize: 28,
    textAlign: 'center',
    color: 'black'
  }
})
