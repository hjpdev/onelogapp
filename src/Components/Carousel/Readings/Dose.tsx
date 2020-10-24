import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import GradientBorder from '../../Minor/GradientBorder'

export type DoseReadingProps = {
  data: {
    reading: number,
    long: boolean
  }
}

export const DoseReading: React.FC<DoseReadingProps> = (props: DoseReadingProps) => {
  const { data } = props
  const { reading, long } = data

  const generateColors = () => {
    return long ? ['#c9c9b7', '#ebebeb'] : ['#ebebeb', '#b2bfaa']
  }

  const generateStartPoint = () => {
    const y = long ? 0.2 : 0.80
    return { x: 0.5, y }
  }

  const generateEndPoint = () => {
    return long ? { x: 0.5, y: 0.25 } : { x: 0.5, y: 0.95 }
  }

  return(
    <View style={Styles.container} testID={'carousel-dose'}>
      <View style={Styles.readingContainer}>
        <LinearGradient colors={generateColors()} start={generateStartPoint()} end={generateEndPoint()} style={{ width: '100%' }}>
          <Text style={Styles.reading}>
          { reading.toFixed(1) }
          </Text>
        </LinearGradient>
        <GradientBorder x={1.0} y={1.0} />
        <Text style={Styles.typeText}>{long ? 'Long' : 'Short'}</Text>
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
