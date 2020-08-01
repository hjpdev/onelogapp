import React from 'react'
import { Text, View } from 'react-native'

import { GradientBorder } from '../Minor/GradientBorder'
import { decimalPadRight, padLeft } from '../Helpers/GeneralHelpers'

import { DoseLayoutStyles } from '../../Assets/Styles/Layouts'

export const DoseLayout: React.FC = ({ previousReadings }) => {
    const hours = padLeft(new Date(previousReadings.created).getHours())
    const minutes = padLeft(new Date(previousReadings.created).getMinutes())
    const created = `${hours}:${minutes}`
    const { reading, islong } = previousReadings

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
      <GradientBorder x={0.4} y={1.0} colors={['grey', '#ebebeb']} />

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
      <GradientBorder x={1.0} y={1.0} />
    </View>
  )
}
