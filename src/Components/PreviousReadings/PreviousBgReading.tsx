import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import GradientBorder from '../Minor/GradientBorder'
import { generateCreatedTime } from '../../Helpers/Date'

type PreviousBgReadingProps = {
  created: string,
  reading: number
}

const PreviousBgReading: React.FC<PreviousBgReadingProps> = (props: PreviousBgReadingProps) => {
  const { created, reading } = props
  const timeCreated = generateCreatedTime(created)

  const generateColor = () => {
    if (reading < 3.9) return 'red'
    if (reading >= 3.9 && reading < 8.1) return 'green'
    if (reading > 8.0) return 'yellow'
  }

  const color = reading && generateColor() || '#ebebeb'

  return(
    <View style={Styles.container}>
      <View><Text style={Styles.timeCreated}>{timeCreated}</Text></View>
      <GradientBorder x={1.0} y={1.0} />
      <View>
        <LinearGradient colors={['#ebebeb', color]} start={{ x: 0.5, y: 0.6}}>
          <Text style={Styles.reading}>{reading.toFixed(1)}</Text>
        </LinearGradient>
      </View>
    </View>
  )
}

export default PreviousBgReading


const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 8,
    marginRight: 8
  },
  timeCreated: {
    fontSize: 16
  },
  reading: {
    fontSize: 38
  }
})