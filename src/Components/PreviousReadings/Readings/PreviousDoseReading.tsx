import React, { useState } from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import ModifyReadingModal from '../../Modals/ModifyReadingModal'
import GradientBorder from '../../Minor/GradientBorder'
import { generateCreatedTime, generateCreatedDate } from '../../../Helpers/Date'

type PreviousDoseReadingProps = {
  data: {
    id: number
    created: string
    reading: number
    long: boolean
  }
  update: (dataKay: string) => void
}

export const PreviousDoseReading: React.FC<PreviousDoseReadingProps> = (props: PreviousDoseReadingProps) => {
  const { data, update } = props

  const [showModifyReadingModal, setShowModifyReadingModal] = useState(false)

  const { id, created, reading, long } = data
  const timeCreated = generateCreatedTime(created)

  const generateColors = () => {
    return long ? ['#c9c9b7', '#ebebeb'] : ['#ebebeb', '#c9d8cf']
  }

  const generateStartPoint = () => {
    const y = long ? (reading / 60) : 1 - (reading / 10)
    return { x: 0.5, y}
  }

  const generateReading = () => {
    return `${reading}`.length < 2 ? reading.toFixed(1) : reading
  }

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
      <TouchableOpacity onPress={() => setShowModifyReadingModal(true)} style={{ width: '100%' }}>
        <View style={Styles.reading}>
          <LinearGradient colors={generateColors()} start={generateStartPoint()}>
            <Text style={Styles.readingText}>{generateReading()}</Text>
          </LinearGradient>
        </View>
        <GradientBorder x={1.0} y={1.0} />
        <View><Text>{long ? 'Long' : 'Short'}</Text></View>
      </TouchableOpacity>
    </View>
    <ModifyReadingModal isVisible={showModifyReadingModal} onClose={() => setShowModifyReadingModal(false)} id={id} name={generateCreatedDate(created)} table={'dose'} dataKey={'doseReadings'} showReadingModal={() => {}} update={() => update('doseReadings')} />
    </>
  )
}


const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    borderWidth: 0.5,
    paddingLeft: 8,
    paddingRight: 8,
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
    width: '100%'
  },
  readingText: {
    width: '100%',
    fontSize: 34,
    textAlign: 'center'
  }
})