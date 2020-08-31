import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import GradientBorder from '../../Minor/GradientBorder'
import { generateCreatedTime } from '../../../Helpers/Date'

type PreviousDoseReadingProps = {
  data: {
    created: string
    reading: number
    long: boolean
  }
}

export const PreviousDoseReading: React.FC<PreviousDoseReadingProps> = (props: PreviousDoseReadingProps) => {
  const { data } = props
  const { created, reading, long } = data
  const timeCreated = generateCreatedTime(created)

  const generateColors = () => {
    return long ? ['#ebebeb', '#b8b8b8'] : ['#ebebeb', '#c9c9c9']
  }

  const generateStartPoint = () => {
    const y = 1 - reading / 15
    return { x: 0.5, y}
  }

  return(
    <View style={Styles.container}>
      <View><Text style={Styles.timeCreated}>{timeCreated}</Text></View>
      <GradientBorder x={1.0} y={1.0} />
      <View style={Styles.reading}>
        <LinearGradient colors={generateColors()} start={generateStartPoint()}>
          <Text style={Styles.readingText}>{reading}</Text>
        </LinearGradient>
      </View>
      <View><Text>{long ? 'Long' : 'Short'}</Text></View>
    </View>
  )
}


const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    borderWidth: 0.5,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 4,
    width: '18%'
  },
  timeCreated: {
    fontSize: 16
  },
  reading: {
    width: '90%',
  },
  readingText: {
    fontSize: 38,
    textAlign: 'center'
  }
})