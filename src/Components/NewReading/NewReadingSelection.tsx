import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { GradientBorder } from '../Minor'
import { SelectionStyles } from './Styles'

const NewReadingSelection: React.FC = () => {
  const navigation = useNavigation()

  return (
    <View style={SelectionStyles.newReadings} testID="new-reading-screen">
      <GradientBorder x={1.0} y={1.0} />
      <TouchableOpacity onPress={() => navigation.navigate('NewBgReading')} style={SelectionStyles.newReading}>
        <Text style={SelectionStyles.newReadingText}>Bg</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />

      <TouchableOpacity onPress={() => navigation.navigate('NewDoseReading')} style={SelectionStyles.newReading}>
        <Text style={SelectionStyles.newReadingText}>Dose</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />

      <TouchableOpacity onPress={() => navigation.navigate('NewMacroReading')} style={SelectionStyles.newReading}>
        <Text style={SelectionStyles.newReadingText}>Macro</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />

      <TouchableOpacity onPress={() => navigation.navigate('NewKetoReading')} style={SelectionStyles.newReading}>
        <Text style={SelectionStyles.newReadingText}>Ketones</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />
    </View>
  )
}

export default NewReadingSelection
