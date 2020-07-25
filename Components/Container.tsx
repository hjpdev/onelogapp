import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export const Container: React.FC = props => {
  const { currentScreen } = props

  return(
    <View style={Styles.containerView}>
      <Text style={Styles.containerText}>
        {currentScreen}
      </Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  containerView: {
    backgroundColor: '#ebebeb',
    height: deviceHeight-120,
    width: deviceWidth,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  containerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    color: 'black',
    fontSize: 28
  }
})
