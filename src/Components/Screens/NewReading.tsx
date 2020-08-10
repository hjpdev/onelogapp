import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import GradientBorder from '../Minor/GradientBorder'

import { ScreenStyles } from '../../Assets/Styles/Screen'

const NewReadingScreen: React.FC = () => {
  return(
    <View style={ScreenStyles.container}>
        <View style={Styles.row}>
          <View>
            <GradientBorder  x={0.5} y={0.5} />
          </View>
          <View><Text>
            {'HELLO'}
            </Text></View>
        </View>

        <View style={Styles.row}>
          <View>
            <GradientBorder  x={0.0} y={0.0} />
          </View>
          <View></View>
        </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  row: {
    backgroundColor: 'blue',
    flexDirection: 'row'
  }
})

export default NewReadingScreen
