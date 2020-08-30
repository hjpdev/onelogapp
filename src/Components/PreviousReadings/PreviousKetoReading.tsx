import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import GradientBorder from '../Minor/GradientBorder'
import { generateCreatedTime } from '../../Helpers/Date'

type PreviousKetoReadingProps = {
  created: string,
  reading: number
}

const PreviousKetoReading: React.FC<PreviousKetoReadingProps> = (props: PreviousKetoReadingProps) => {
  const { created, reading } = props
  const timeCreated = generateCreatedTime(created)

  return(
    <View style={Styles.container}>
      <View><Text style={Styles.timeCreated}>{timeCreated}</Text></View>
      <GradientBorder x={1.0} y={1.0} />
      <View>
        <LinearGradient colors={['#ebebeb', 'grey']} start={{ x: 0.5, y: 0.75}}>
          <Text style={Styles.reading}>{reading.toFixed(1)}</Text>
        </LinearGradient>
      </View>
    </View>
  )
}

export default PreviousKetoReading


const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    borderWidth: 0.5,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 8
  },
  timeCreated: {
    fontSize: 16
  },
  reading: {
    fontSize: 38
  }
})