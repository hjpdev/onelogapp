import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { GradientBorder } from '../Minor'

const NewReadingSelection: React.FC = () => {
  const navigation = useNavigation()

  return (
    <View style={Styles.newReadings} testID="new-reading-screen">
      <GradientBorder x={1.0} y={1.0} />
      <TouchableOpacity onPress={() => navigation.navigate('NewBgReading')} style={Styles.newReading}>
        <Text style={Styles.newReadingText}>Bg</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />

      <TouchableOpacity onPress={() => navigation.navigate('NewDoseReading')} style={Styles.newReading}>
        <Text style={Styles.newReadingText}>Dose</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />

      <TouchableOpacity onPress={() => navigation.navigate('NewMacroReading')} style={Styles.newReading}>
        <Text style={Styles.newReadingText}>Macro</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />

      <TouchableOpacity onPress={() => navigation.navigate('NewKetoReading')} style={Styles.newReading}>
        <Text style={Styles.newReadingText}>Ketones</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />
    </View>
  )
}

export default NewReadingSelection

const Styles = StyleSheet.create({
  newReadings: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  newReading: {
    alignItems: 'center',
    width: '100%',
    padding: 42
  },
  newReadingText: {
    fontSize: 22
  }
})
