import React, { useState } from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import ModifyDoseModal from '../../Modals/Modification/ModifyDoseModal'
import { GradientBorder } from '../../Minor'
import { generateCreatedTime } from '../../../Helpers/Date'
import { DataKey, DoseText, StoredDoseReading } from '../../../types'
import { DoseStyles } from '../Styles'
import Colors from '../../../Assets/Styles/Colors'

interface PreviousDoseReadingProps {
  reading: StoredDoseReading
  update: (_: DataKey) => void
}

export const PreviousDoseReading: React.FC<PreviousDoseReadingProps> = (props: PreviousDoseReadingProps) => {
  const { reading, update } = props
  const { created, data, long } = reading
  const timeCreated = generateCreatedTime(created)

  const [showModifyDoseModal, setShowModifyDoseModal] = useState(false)

  const generateColors = () => (long ? [Colors.doseLong, Colors.lightGrey1] : [Colors.lightGrey1, Colors.doseShort])

  const generateStartPoint = () => {
    const y = long ? (data - 10) / 25 : 1 - data / 20
    return { x: 0.5, y }
  }

  const generateReading = () => (`${data}`.length < 2 ? data.toFixed(1) : data)

  return (
    <>
      <View style={DoseStyles.container}>
        <View style={DoseStyles.header}>
          <TouchableOpacity onPress={() => setShowModifyDoseModal(true)}>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={DoseStyles.icon} />
          </TouchableOpacity>
          <Text style={DoseStyles.timeCreated}>{timeCreated}</Text>
          <TouchableOpacity>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={DoseStyles.placeholder} />
          </TouchableOpacity>
        </View>
        <GradientBorder x={1.0} y={1.0} />
        <TouchableOpacity onPress={() => setShowModifyDoseModal(true)} style={DoseStyles.readingBackground}>
          <View style={DoseStyles.reading}>
            <LinearGradient colors={generateColors()} start={generateStartPoint()}>
              <Text style={DoseStyles.readingText}>{generateReading()}</Text>
            </LinearGradient>
          </View>
          <GradientBorder x={1.0} y={1.0} />
          <Text style={DoseStyles.typeText}>{long ? DoseText.long : DoseText.short}</Text>
        </TouchableOpacity>
      </View>
      <ModifyDoseModal
        isVisible={showModifyDoseModal}
        reading={reading}
        onClose={() => setShowModifyDoseModal(false)}
        update={update}
      />
    </>
  )
}

export default PreviousDoseReading
