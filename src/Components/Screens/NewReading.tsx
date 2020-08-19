import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import GradientBorder from '../Minor/GradientBorder'

import { ScreenStyles } from '../../Assets/Styles/Screen'

const NewReadingScreen: React.FC = () => {
  return(
    <View style={ScreenStyles.container} testID={'new-reading-screen'}>
      <View style={Styles.newReadings}>
        <GradientBorder x={1.0} y={1.0} />
        <TouchableOpacity style={Styles.newReading}>
          <Text style={Styles.newReadingText}>{'Bg'}</Text>
        </TouchableOpacity>
        <GradientBorder x={1.0} y={1.0} />

        <TouchableOpacity style={Styles.newReading}>
          <Text style={Styles.newReadingText}>{'Dose'}</Text>
        </TouchableOpacity>
        <GradientBorder x={1.0} y={1.0} />

        <TouchableOpacity style={Styles.newReading}>
          <Text style={Styles.newReadingText}>{'Macro'}</Text>
        </TouchableOpacity>
        <GradientBorder x={1.0} y={1.0} />

        <TouchableOpacity style={Styles.newReading}>
          <Text style={Styles.newReadingText}>{'Ketones'}</Text>
        </TouchableOpacity>
        <GradientBorder x={1.0} y={1.0} />
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  newReadings: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
    width: '100%'
  },
  newReading: {
    alignItems: 'center',
    // backgroundColor: 'yellow',
    width: '100%',
    padding: 40
  },
  newReadingText: {
    fontSize: 22
  }
})

export default NewReadingScreen
