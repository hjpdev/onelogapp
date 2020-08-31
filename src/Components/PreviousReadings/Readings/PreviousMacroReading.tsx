import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import GradientBorder from '../../Minor/GradientBorder'
import { generateCreatedTime } from '../../../Helpers/Date'

type PreviousMacroReadingProps = {
  data: {
    created: string
    kcal: number
    carbs: number
    sugar: number
    protein: number
    fat: number
  }
}

export const PreviousMacroReading: React.FC<PreviousMacroReadingProps> = (props: PreviousMacroReadingProps) => {
  const { data } = props
  const { created, kcal, carbs, sugar, protein, fat } = data
  const timeCreated = generateCreatedTime(created)

  return(
    <View style={Styles.container}>
      <View><Text style={Styles.timeCreated}>{timeCreated}</Text></View>
      <GradientBorder x={1.0} y={1.0} />
      <View style={Styles.readingContainer}>
        <View style={Styles.labels}>
          <Text style={Styles.label}>{'Kcal'}</Text>
          <Text style={Styles.label}>{'Carbs'}</Text>
          <Text style={Styles.label}>{'Sugar'}</Text>
          <Text style={Styles.label}>{'Protein'}</Text>
          <Text style={Styles.label}>{'Fat'}</Text>
        </View>

        <View style={Styles.values}>
          <Text style={Styles.value}>{ kcal.toFixed(1) }</Text>
          <Text style={Styles.value}>{ carbs.toFixed(1) }</Text>
          <Text style={Styles.value}>{ sugar.toFixed(1) }</Text>
          <Text style={Styles.value}>{ protein.toFixed(1) }</Text>
          <Text style={Styles.value}>{ fat.toFixed(1) }</Text>
        </View>
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
    margin: 5,
  },
  timeCreated: {
    fontSize: 16
  },
  reading: {
    fontSize: 38
  },
  readingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    backgroundColor: '#ebebeb',
    // width: '100%'
  },
  labels: {
    flexDirection: 'column',
    padding: 10
  },
  label: {
    fontSize: 14,
    color: '#3f3d3d'
  },
  values: {
    flexDirection: 'column',
    padding: 10
  },
  value: {
    fontSize: 14,
    alignSelf: 'flex-end',
    color: 'black'
  }
})