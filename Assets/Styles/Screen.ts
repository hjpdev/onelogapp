import { Dimensions, StyleSheet } from 'react-native'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export const ScreenStyles = StyleSheet.create({
  containerView: {
    backgroundColor: '#ebebeb',
    height: deviceHeight-120,
    width: deviceWidth,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  containerText: {
    textAlign: 'center',
    // textAlignVertical: 'center',
    // alignSelf: 'center',
    color: 'black',
    fontSize: 28
  }
})
