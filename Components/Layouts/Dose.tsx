import React from 'react'
import { Text, View } from 'react-native'

import { decimalPadRight, padLeft } from '../Helpers/GeneralHelpers'

import { DoseLayoutStyles } from '../../Assets/Styles/Layouts'

export const DoseLayout: React.FC = ({ lastReading }) => {
    const hours = padLeft(new Date(lastReading.created).getHours())
    const minutes = padLeft(new Date(lastReading.created).getMinutes())
    const created = `${hours}:${minutes}`
    const { reading, islong } = lastReading

  return(
    <View style={DoseLayoutStyles.doseLayoutContainer}>
      <View style={DoseLayoutStyles.doseLayoutHeader}>
        <Text style={DoseLayoutStyles.doseLayoutTag}>
          { 'Dose' }
        </Text>
        <Text style={DoseLayoutStyles.doseLayoutTime}>
          { created }
        </Text>
      </View>

      <View style={DoseLayoutStyles.doselayoutContent}>
        <View>
          <Text style={DoseLayoutStyles.doseLayoutText}>
            { `${decimalPadRight(reading)}` }
          </Text>
          <Text style={DoseLayoutStyles.doseLayoutUnit}>
            { 'Units' }
          </Text>
        </View>
        <Text style={DoseLayoutStyles.doseLayoutType}>
          { islong === true ? 'Long' : 'Short' }
        </Text>
      </View>
    </View>
  )
}
