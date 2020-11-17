import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import GradientBorder from '../../Minor/GradientBorder'

export type DoseReadingProps = {
  reading: {
    data: number,
    long: boolean
  }
}

export const DoseReading: React.FC<DoseReadingProps> = (props: DoseReadingProps) => {
  const { reading } = props
  const { data, long } = reading

  const generateColors = () => (long ? ['#ebebeb', '#c9c9b7'] : ['#ebebeb', '#b2bfaa'])

  return (
    <View style={Styles.container} testID="carousel-dose">
      <View style={Styles.readingContainer}>
        <LinearGradient colors={generateColors()} start={{ x: 0.5, y: 0.8 }} end={{ x: 0.5, y: 0.95 }} style={{ width: '100%' }}>
          <Text style={Styles.reading}>
            { data.toFixed(1) }
          </Text>
        </LinearGradient>
        <GradientBorder x={1.0} y={1.0} />
        <Text>{long ? 'Long' : 'Short'}</Text>
      </View> 
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  readingContainer: {
    alignItems: 'center',
    width: '50%'
  },
  reading: {
    fontSize: 54,
    textAlign: 'center',
    paddingTop: 8,
    color: 'black'
  },
  unit: {
    fontSize: 12,
  }
})
