import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import GradientBorder from '../Minor/GradientBorder'
import { generateCreatedTime } from '../../Helpers/Date'

type PreviousBgReadingProps = {
  created: string,
  reading: number
}

const PreviousBgReading: React.FC<PreviousBgReadingProps> = (props: PreviousBgReadingProps) => {
  const { created, reading } = props
  const timeCreated = generateCreatedTime(created)

  return(
    <View style={Styles.container}>
      <View><Text>{timeCreated}</Text></View>
      <GradientBorder x={1.0} y={1.0} />
      <View><Text style={Styles.reading}>{reading.toFixed(1)}</Text></View>
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
  reading: {
    fontSize: 28
  }
})