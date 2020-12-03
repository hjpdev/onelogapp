import React, { useState } from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import ModifyKetoModal from '../../Modals/Modification/ModifyKetoModal'
import { GradientBorder } from '../../Minor'
import { generateCreatedTime } from '../../../Helpers/Date'
import { DataKey, StoredKetoReading } from '../../../types'
import { KetoStyles } from '../Styles'
import Colors from '../../../Assets/Styles/Colors'

interface PreviousKetoReadingProps {
  reading: StoredKetoReading
  update: (_: DataKey) => void
}

export const PreviousKetoReading: React.FC<PreviousKetoReadingProps> = (props: PreviousKetoReadingProps) => {
  const { reading, update } = props

  const [showModifyKetoModal, setShowModifyKetoModal] = useState(false)

  const { created, data } = reading
  const timeCreated = generateCreatedTime(created)

  return (
    <>
      <View style={KetoStyles.container}>
        <View style={KetoStyles.header}>
          <TouchableOpacity onPress={() => setShowModifyKetoModal(true)} style={{}}>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={KetoStyles.icon} />
          </TouchableOpacity>
          <Text style={KetoStyles.timeCreated}>{timeCreated}</Text>
          <TouchableOpacity>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={KetoStyles.placeholder} />
          </TouchableOpacity>
        </View>
        <GradientBorder x={1.0} y={1.0} />
        <TouchableOpacity
          onPress={() => setShowModifyKetoModal(true)}
          activeOpacity={50}
        >
          <View>
            <LinearGradient
              style={KetoStyles.readingBackground}
              colors={[Colors.lightGrey1, Colors.keto]}
              start={{ x: 0.5, y: 0.75 }}
            >
              <Text style={KetoStyles.reading}>{data.toFixed(1)}</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
      <ModifyKetoModal
        isVisible={showModifyKetoModal}
        reading={reading}
        onClose={() => setShowModifyKetoModal(false)}
        update={update}
      />
    </>
  )
}

export default PreviousKetoReading
