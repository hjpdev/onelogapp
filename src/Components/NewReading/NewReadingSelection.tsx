import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import GradientBorder from '../Minor/GradientBorder'

interface NewReadingSelectionProps {
  setNewReadingType: (newReadingType: string) => void
}

export const NewReadingSelection: React.FC<NewReadingSelectionProps> = (props: NewReadingSelectionProps) => {
  const { setNewReadingType } = props

  return(
    <View style={Styles.newReadings}>
      <GradientBorder x={1.0} y={1.0} />
      <TouchableOpacity onPress={() => setNewReadingType('bg')} style={Styles.newReading}>
        <Text style={Styles.newReadingText}>{'Bg'}</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />

      <TouchableOpacity onPress={() => setNewReadingType('dose')} style={Styles.newReading}>
        <Text style={Styles.newReadingText}>{'Dose'}</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />

      <TouchableOpacity onPress={() => setNewReadingType('macro')} style={Styles.newReading}>
        <Text style={Styles.newReadingText}>{'Macro'}</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />

      <TouchableOpacity onPress={() => setNewReadingType('keto')} style={Styles.newReading}>
        <Text style={Styles.newReadingText}>{'Ketones'}</Text>
      </TouchableOpacity>
      <GradientBorder x={1.0} y={1.0} />
    </View>
  )
}

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
    padding: 40
  },
  newReadingText: {
    fontSize: 22
  }
})

