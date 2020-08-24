import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export type MacroReadingProps = {
  data: {
    kcal: number,
    carbs: number,
    sugar: number,
    protein: number,
    fat: number
  }
}

export const MacroReading: React.FC<MacroReadingProps> = (props: MacroReadingProps) => {
  const { data } = props
  const { kcal, carbs, sugar, protein, fat } = data

  return(
      <View style={Styles.container} testID={'carousel-macro'}>
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
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    backgroundColor: '#ebebeb',
    width: '100%'
  },
  labels: {
    flexDirection: 'column',
    padding: 20
  },
  label: {
    fontSize: 16,
    color: '#3f3d3d'
  },
  values: {
    flexDirection: 'column',
    padding: 20
  },
  value: {
    fontSize: 16,
    alignSelf: 'flex-end',
    color: 'black'
  }
})
