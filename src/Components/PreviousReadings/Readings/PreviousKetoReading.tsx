import React, { useState } from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import ModifyReadingModal from '../../Modals/Modification/ModifyReadingModal'
import ModifyKetoModal from '../../Modals/Modification/ModifyKetoModal'
import GradientBorder from '../../Minor/GradientBorder'
import { generateCreatedTime, generateCreatedDate } from '../../../Helpers/Date'

type PreviousKetoReadingProps = {
  data: {
    id: number
    created: string,
    reading: number
  }
  update: (dataKey: string) => void
}

export const PreviousKetoReading: React.FC<PreviousKetoReadingProps> = (props: PreviousKetoReadingProps) => {
  const { data, update } = props

  const [showModifyReadingModal, setShowModifyReadingModal] = useState(false)
  const [showModifyKetoModal, setShowModifyKetoModal] = useState(false)

  const { id, created, reading } = data
  const timeCreated = generateCreatedTime(created)

  return(
    <>
    <View style={Styles.container}>
      <View style={Styles.header}>
        <TouchableOpacity onPress={() => setShowModifyReadingModal(true)} style={{}}>
          <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={Styles.icon} />
        </TouchableOpacity>
        <Text style={Styles.timeCreated}>{timeCreated}</Text>
        <TouchableOpacity>
          <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={Styles.placeholder} />
        </TouchableOpacity>
      </View>
      <GradientBorder x={1.0} y={1.0} />
      <TouchableOpacity onPress={() => setShowModifyReadingModal(true)} style={{ backgroundColor: 'black' }} activeOpacity={50}>
      <View>
        <LinearGradient style={{ width: '100%' }} colors={['#ebebeb', '#b8b884']} start={{ x: 0.5, y: 0.75}}>
          <Text style={Styles.reading}>{reading.toFixed(1)}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
    </View>
    <ModifyReadingModal isVisible={showModifyReadingModal} onClose={() => setShowModifyReadingModal(false)} id={id} name={generateCreatedDate(created)} table={'keto'} dataKey={'ketoReadings'} showReadingModal={() => setShowModifyKetoModal(true)} update={() => update('ketoReadings')} />
    <ModifyKetoModal isVisible={showModifyKetoModal} data={data} onClose={() => setShowModifyKetoModal(false)} update={update} />
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