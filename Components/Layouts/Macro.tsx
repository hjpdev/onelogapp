import React from 'react'
import { Text, View } from 'react-native'

import { generateCreatedDate } from '../Helpers/DateHelpers'

import { MacroLayoutStyles } from '../../Assets/Styles/Layouts'

interface MacroLayoutProps {
  kcal: number,
  carbs: number,
  sugar: number,
  protein: number,
  fat: number
}

export const MacroLayout: React.FC = ({ lastReading }) => {
    const created: string = generateCreatedDate(lastReading.created)
    const { kcal, carbs, sugar, protein, fat }: MacroLayoutProps = lastReading

  return(
    <View style={MacroLayoutStyles.macroReadingContainer}>
      <View style={MacroLayoutStyles.macroLayoutHeader}>
        <Text style={MacroLayoutStyles.macroLayoutTag}>
          { 'Macro' }
        </Text>
        <Text style={MacroLayoutStyles.macroLayoutTime}>
          { created }
        </Text>
      </View>

      <View style={MacroLayoutStyles.macroLayoutContentContainer}>
        <View style={MacroLayoutStyles.macroLayoutTable}>
          <View style={MacroLayoutStyles.macroLayoutTableHeaders}>
            <Text style={MacroLayoutStyles.macroLayoutTableHeader}>{'Kcal'}</Text>
            <Text style={MacroLayoutStyles.macroLayoutTableHeader}>{'Carbs'}</Text>
            <Text style={MacroLayoutStyles.macroLayoutTableHeader}>{'Sugar'}</Text>
            <Text style={MacroLayoutStyles.macroLayoutTableHeader}>{'Protein'}</Text>
            <Text style={MacroLayoutStyles.macroLayoutTableHeader}>{'Fat'}</Text>
          </View>
          <View style={MacroLayoutStyles.macroLayoutTableValues}>
            <Text style={MacroLayoutStyles.macroLayoutTableValue}>{ kcal.toFixed(1) }</Text>
            <Text style={MacroLayoutStyles.macroLayoutTableValue}>{ carbs.toFixed(1) }</Text>
            <Text style={MacroLayoutStyles.macroLayoutTableValue}>{ sugar.toFixed(1) }</Text>
            <Text style={MacroLayoutStyles.macroLayoutTableValue}>{ protein.toFixed(1) }</Text>
            <Text style={MacroLayoutStyles.macroLayoutTableValue}>{ fat.toFixed(1) }</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
