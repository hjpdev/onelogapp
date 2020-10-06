import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import GradientBorder from '../../Minor/GradientBorder'
import { generateCreatedTime } from '../../../Helpers/Date'

type PreviousKetoReadingProps = {
  data: {
    created: string,
    reading: number
  }
  update: () => void
}

export const PreviousKetoReading: React.FC<PreviousKetoReadingProps> = (props: PreviousKetoReadingProps) => {
  const { data, update } = props
  const { created, reading } = data
  const timeCreated = generateCreatedTime(created)

  return(
    <View style={Styles.container}>
      <View><Text style={Styles.timeCreated}>{timeCreated}</Text></View>
      <GradientBorder x={1.0} y={1.0} />
      <View>
        <LinearGradient colors={['#ebebeb', '#b8b8b8']} start={{ x: 0.5, y: 0.75}}>
          <Text style={Styles.reading}>{reading.toFixed(1)}</Text>
        </LinearGradient>
      </View>
    </View>
  )
}


const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    borderWidth: 0.5,
    paddingLeft: 6,
    paddingRight: 6,
    margin: 4,
    width: '18%'
  },
  timeCreated: {
    fontSize: 16
  },
  reading: {
    fontSize: 38
  }
})