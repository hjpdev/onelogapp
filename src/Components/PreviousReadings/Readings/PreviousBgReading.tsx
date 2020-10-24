import React, { useState } from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import ModifyReadingModal from '../../Modals/Modification/ModifyReadingModal'
import GradientBorder from '../../Minor/GradientBorder'
import ModifyBgModal from '../../Modals/Modification/ModifyBgModal'
import { generateCreatedTime, generateCreatedDate } from '../../../Helpers/Date'

type PreviousBgReadingProps = {
  data: {
    id: number,
    created: string
    reading: number
  }
  update: (dataKey: string) => void
}

export const PreviousBgReading: React.FC<PreviousBgReadingProps> = (props: PreviousBgReadingProps) => {
  const { data, update } = props
  
  const [showModifyReadingModal, setShowModifyReadingModal] = useState(false)
  const [showModifyBgModal, setShowModifyBgModal] = useState(false)
  
  const { id, created, reading } = data
  const timeCreated = generateCreatedTime(created)

  const generateColor = () => {
    if (reading < 3.9) return 'rgba(217, 30, 30, 0.9)' //'#d91e1e'
    if (reading >= 3.9 && reading < 8.1) return '#279621'
    if (reading > 8.0) return '#deda00'
  }

  const color = reading && generateColor() || '#ebebeb'

  return(
    <>
    <View style={Styles.container}>
      <View style={Styles.header}>
        <TouchableOpacity onPress={() => setShowModifyReadingModal(true)}>
          <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={Styles.icon} />
        </TouchableOpacity>
        <Text style={Styles.timeCreated}>{timeCreated}</Text>
        <TouchableOpacity>
          <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={Styles.placeholder} />
        </TouchableOpacity>
      </View>
      <GradientBorder x={1.0} y={1.0} />
      <TouchableOpacity onPress={() => setShowModifyReadingModal(true)}>
        <View>
          <LinearGradient colors={['#ebebeb', color]} start={{ x: 0.5, y: 0.75}}>
            <Text style={Styles.reading}>{reading.toFixed(1)}</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
    <ModifyReadingModal isVisible={showModifyReadingModal} onClose={() => setShowModifyReadingModal(false)} id={id} name={generateCreatedDate(created)} table={'bg'} dataKey={'bgReadings'} showReadingModal={() => setShowModifyBgModal(true)} update={() => update('bgReadings')} />
    <ModifyBgModal isVisible={showModifyBgModal} data={data} onClose={() => setShowModifyBgModal(false)} update={update} />
    </>
  )
}


const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    borderWidth: 0.5,
    paddingLeft: 6,
    paddingRight: 6,
    margin: 4,
    width: '18%'
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
    fontSize: 28,
    paddingVertical: 6
  }
})