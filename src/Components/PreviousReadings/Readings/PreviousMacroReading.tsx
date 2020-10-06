import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import GradientBorder from '../../Minor/GradientBorder'
import ModifyReadingModal from '../../Modals/ModifyReadingModal'
import { generateCreatedTime } from '../../../Helpers/Date'
import ModifyMacroModal from '../../Modals/ModifyMacroModal'

type PreviousMacroReadingProps = {
  data: {
    id: number
    created: string
    kcal: number
    carbs: number
    sugar: number
    protein: number
    fat: number
  }
  update: (dataKey: string) => void
}

export const PreviousMacroReading: React.FC<PreviousMacroReadingProps> = (props: PreviousMacroReadingProps) => {
  const { data, update } = props

  const [showModifyReadingModal, setShowModifyReadingModal] = useState(false)
  const [showModifyMacroModal, setShowModifyMacroModal] = useState(false)

  const { id, created, kcal, carbs, sugar, protein, fat } = data
  const timeCreated = generateCreatedTime(created)

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
      <View style={Styles.readingContainer}>
        <View style={Styles.labels}>
          <Text style={Styles.label}>{'Kcal:'}</Text>
          <Text style={Styles.label}>{'Carbs:'}</Text>
          <Text style={Styles.label}>{'Sugar:'}</Text>
          <Text style={Styles.label}>{'Protein:'}</Text>
          <Text style={Styles.label}>{'Fat:'}</Text>
        </View>

        <View style={Styles.values}>
          <Text style={Styles.value}>{ kcal.toFixed(1) }</Text>
          <Text style={Styles.value}>{ carbs.toFixed(1) }</Text>
          <Text style={Styles.value}>{ sugar.toFixed(1) }</Text>
          <Text style={Styles.value}>{ protein.toFixed(1) }</Text>
          <Text style={Styles.value}>{ fat.toFixed(1) }</Text>
        </View>
      </View>
    </View>
    <ModifyReadingModal isVisible={showModifyReadingModal} onClose={() => setShowModifyReadingModal(false)} id={id} name={created} table={'macro'} showReadingModal={() => setShowModifyMacroModal(true)} update={() => update('macroReadings')} />
    <ModifyMacroModal isVisible={showModifyMacroModal} data={data} onClose={() => setShowModifyMacroModal(false)} update={update} />
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
    margin: '1.1%',
    width: '31%'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeCreated: {
    fontSize: 16
  },
  icon: {
    tintColor: 'black',
    height: 14,
    width: 14,
    padding: 4,
    marginTop: 4
  },
  placeholder: {
    tintColor: '#ebebeb',
    height: 14,
    width: 14,
    padding: 4,
    marginTop: 4
  },
  reading: {
    fontSize: 38
  },
  readingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 8,
  },
  labels: {
    flexDirection: 'column',
    padding: 10
  },
  label: {
    fontSize: 14,
    color: '#3f3d3d'
  },
  values: {
    flexDirection: 'column',
    padding: 10
  },
  value: {
    fontSize: 14,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: 'black'
  }
})