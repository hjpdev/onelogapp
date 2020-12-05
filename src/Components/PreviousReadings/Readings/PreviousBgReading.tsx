import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Image, View, Text, TouchableOpacity } from 'react-native'

import ModifyBgModal from '../../Modals/Modification/ModifyBgModal'
import { GradientBorder } from '../../Minor'
import { generateCreatedTime } from '../../../Helpers/Date'
import { StoredBgReading, DataKey } from '../../../types'
import { BgStyles } from '../Styles'
import Colors from '../../../Assets/Styles/Colors'

interface PreviousBgReadingProps {
  reading: StoredBgReading
  update: (_: DataKey) => void
}

export const PreviousBgReading: React.FC<PreviousBgReadingProps> = (props: PreviousBgReadingProps) => {
  const { reading, update } = props

  const [showModifyBgModal, setShowModifyBgModal] = useState(false)

  const { created, data } = reading
  const timeCreated = generateCreatedTime(created)

  const generateColor = (): string => {
    let color = Colors.bgGreen
    if (data < 3.9) color = Colors.bgRed // '#d91e1e'
    if (data > 8.0) color = Colors.bgYellow

    return color
  }

  const color = (reading && generateColor()) || Colors.lightGrey1

  return (
    <>
      <View style={BgStyles.container}>
        <View style={BgStyles.header}>
          <TouchableOpacity onPress={() => setShowModifyBgModal(true)}>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={BgStyles.icon} />
          </TouchableOpacity>
          <Text style={BgStyles.timeCreated}>{timeCreated}</Text>
          <TouchableOpacity>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={BgStyles.placeholder} />
          </TouchableOpacity>
        </View>
        <GradientBorder x={1.0} y={1.0} />
        <TouchableOpacity onPress={() => setShowModifyBgModal(true)}>
          <View>
            <LinearGradient colors={[Colors.lightGrey1, color]} start={{ x: 0.5, y: 0.75 }}>
              <Text style={BgStyles.reading}>{data.toFixed(1)}</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
      <ModifyBgModal
        isVisible={showModifyBgModal}
        reading={reading}
        onClose={() => setShowModifyBgModal(false)}
        showBgModal={() => setShowModifyBgModal(true)}
        update={update}
      />
    </>
  )
}

export default PreviousBgReading
