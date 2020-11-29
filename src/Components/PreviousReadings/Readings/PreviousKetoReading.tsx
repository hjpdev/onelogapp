import React, { useState } from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import ModifyKetoModal from '../../Modals/Modification/ModifyKetoModal'
import GradientBorder from '../../Minor/GradientBorder'
import { generateCreatedTime } from '../../../Helpers/Date'
import { StoredKetoReading } from '../../../types'

interface PreviousKetoReadingProps {
  reading: StoredKetoReading
  update: (dataKey: string) => void
}

export const PreviousKetoReading: React.FC<PreviousKetoReadingProps> = (props: PreviousKetoReadingProps) => {
  const { reading, update } = props

  const [showModifyKetoModal, setShowModifyKetoModal] = useState(false)

  const { created, data } = reading
  const timeCreated = generateCreatedTime(created)

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.header}>
          <TouchableOpacity onPress={() => setShowModifyKetoModal(true)} style={{}}>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={Styles.icon} />
          </TouchableOpacity>
          <Text style={Styles.timeCreated}>{timeCreated}</Text>
          <TouchableOpacity>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={Styles.placeholder} />
          </TouchableOpacity>
        </View>
        <GradientBorder x={1.0} y={1.0} />
        <TouchableOpacity onPress={() => setShowModifyKetoModal(true)} style={{ backgroundColor: 'black' }} activeOpacity={50}>
          <View>
            <LinearGradient style={{ width: '100%' }} colors={['#ebebeb', '#b8b884']} start={{ x: 0.5, y: 0.75 }}>
              <Text style={Styles.reading}>{data.toFixed(1)}</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
      <ModifyKetoModal isVisible={showModifyKetoModal} reading={reading} onClose={() => setShowModifyKetoModal(false)} update={update} />
    </>
  )
}

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    paddingLeft: 6,
    paddingRight: 6,
    margin: 4,
    width: '23%'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    tintColor: 'black',
    height: 10,
    width: 10
  },
  placeholder: {
    tintColor: '#ebebeb',
    height: 10,
    width: 10
  },
  timeCreated: {
    fontSize: 14
  },
  reading: {
    fontSize: 34
  }
})
