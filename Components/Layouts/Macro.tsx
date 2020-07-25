import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { decimalPadRight, padLeft } from '../Helpers/GeneralHelpers'

interface MacroLayoutProps {
  kcal: number,
  carbs: number,
  sugar: number,
  protein: number,
  fat: number
}

export const MacroLayout: React.FC = ({ lastReading }) => {
    const hours: (string | number) = padLeft(new Date(lastReading.created).getHours())
    const minutes: (string | number) = padLeft(new Date(lastReading.created).getMinutes())
    const created: string = `${hours}:${minutes}`
    const { kcal, carbs, sugar, protein, fat }: MacroLayoutProps = lastReading

  return(
    <View style={Styles.macroReadingContainer}>
      <View style={Styles.macroLayoutHeader}>
        <Text style={Styles.macroLayoutTag}>
          { 'Macro' }
        </Text>
        <Text style={Styles.macroLayoutTime}>
          { created }
        </Text>
      </View>
      <View style={Styles.macroLayoutContentContainer}>
        <View style={Styles.macroLayoutTable}>
          <View style={Styles.macroLayoutTableColumnHeaders}>
            <Text style={Styles.macroLayoutTableColumnHeader}>{'Kcal'}</Text>
            <Text style={Styles.macroLayoutTableColumnHeader}>{'Carbs'}</Text>
            <Text style={Styles.macroLayoutTableColumnHeader}>{'Sugar'}</Text>
            <Text style={Styles.macroLayoutTableColumnHeader}>{'Protein'}</Text>
            <Text style={Styles.macroLayoutTableColumnHeader}>{'Fat'}</Text>
          </View>
          <View style={Styles.macroLayoutTableColumnValues}>
            <Text style={Styles.macroLayoutTableColumnValue}>{ kcal.toFixed(1) }</Text>
            <Text style={Styles.macroLayoutTableColumnValue}>{ carbs.toFixed(1) }</Text>
            <Text style={Styles.macroLayoutTableColumnValue}>{ sugar.toFixed(1) }</Text>
            <Text style={Styles.macroLayoutTableColumnValue}>{ protein.toFixed(1) }</Text>
            <Text style={Styles.macroLayoutTableColumnValue}>{ fat.toFixed(1) }</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  macroReadingContainer: {
    borderWidth: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  macroLayoutContentContainer: {
    flex: 5,
    // borderWidth: 0.5,
    width: '80%'
  },
  macroLayoutTable: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  macroLayoutTableColumnHeaders: {
    flexDirection: 'column',
    padding: 20
  },
  macroLayoutTableColumnHeader: {
    fontSize: 16
  },
  macroLayoutTableColumnValues: {
    flexDirection: 'column',
    padding: 20
  },
  macroLayoutTableColumnValue: {
    fontSize: 16
  },
  macroReadingReading: {
    fontSize: 10,
    lineHeight: 14
  },
  macroLayoutTime: {
    fontSize: 22,
    textAlignVertical: 'top'
  },
  macroLayoutTag: {
    fontSize: 22
  },
  macroLayoutHeader: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})
