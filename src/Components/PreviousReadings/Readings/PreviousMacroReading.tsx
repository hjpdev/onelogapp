import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import ModifyMacroModal from '../../Modals/Modification/ModifyMacroModal'
import { GradientBorder } from '../../Minor'
import { generateCreatedTime } from '../../../Helpers/Date'
import { DataKey, StoredMacroReading } from '../../../types'
import { MacroStyles } from '../Styles'

interface PreviousMacroReadingProps {
  reading: StoredMacroReading
  update: (_: DataKey) => void
}

export const PreviousMacroReading: React.FC<PreviousMacroReadingProps> = (props: PreviousMacroReadingProps) => {
  const { reading, update } = props

  const [showModifyMacroModal, setShowModifyMacroModal] = useState(false)

  const { created, data } = reading
  const { kcal, carbs, sugar, protein, fat } = data
  const timeCreated = generateCreatedTime(created)

  return (
    <>
      <View style={MacroStyles.container}>
        <View style={MacroStyles.header}>
          <TouchableOpacity onPress={() => setShowModifyMacroModal(true)}>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={MacroStyles.icon} />
          </TouchableOpacity>
          <Text style={MacroStyles.timeCreated}>{timeCreated}</Text>
          <TouchableOpacity>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={MacroStyles.placeholder} />
          </TouchableOpacity>
        </View>
        <GradientBorder x={1.0} y={1.0} />
        <TouchableOpacity onPress={() => setShowModifyMacroModal(true)} style={MacroStyles.readingContainer}>
          <View style={MacroStyles.readingContainer}>
            <View style={MacroStyles.labels}>
              <Text style={MacroStyles.label}>Kcal:</Text>
              <Text style={MacroStyles.label}>Carbs:</Text>
              <Text style={MacroStyles.label}>Sugar:</Text>
              <Text style={MacroStyles.label}>Protein:</Text>
              <Text style={MacroStyles.label}>Fat:</Text>
            </View>

            <View style={MacroStyles.values}>
              <Text style={MacroStyles.value}>{kcal.toFixed(1)}</Text>
              <Text style={MacroStyles.value}>{carbs.toFixed(1)}</Text>
              <Text style={MacroStyles.value}>{sugar.toFixed(1)}</Text>
              <Text style={MacroStyles.value}>{protein.toFixed(1)}</Text>
              <Text style={MacroStyles.value}>{fat.toFixed(1)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <ModifyMacroModal
        isVisible={showModifyMacroModal}
        reading={reading}
        onClose={() => setShowModifyMacroModal(false)}
        update={update}
      />
    </>
  )
}

export default PreviousMacroReading
