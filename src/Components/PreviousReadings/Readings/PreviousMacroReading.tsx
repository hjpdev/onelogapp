import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import GradientBorder from '../../Minor/GradientBorder'
import ModifyMacroModal from '../../Modals/Modification/ModifyMacroModal'
import { generateCreatedTime, generateCreatedDate } from '../../../Helpers/Date'

type PreviousMacroReadingProps = {
  reading: {
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
  const { reading, update } = props

  const [showModifyMacroModal, setShowModifyMacroModal] = useState(false)

  const { id, created, kcal, carbs, sugar, protein, fat } = reading
  const timeCreated = generateCreatedTime(created)

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.header}>
          <TouchableOpacity onPress={() => setShowModifyMacroModal(true)}>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={Styles.icon} />
          </TouchableOpacity>
          <Text style={Styles.timeCreated}>{timeCreated}</Text>
          <TouchableOpacity>
            <Image source={require('../../../Assets/Images/NavBarSettings.png')} style={Styles.placeholder} />
          </TouchableOpacity>
        </View>
        <GradientBorder x={1.0} y={1.0} />
        <TouchableOpacity onPress={() => setShowModifyMacroModal(true)} style={Styles.readingContainer}>
          <View style={Styles.readingContainer}>
            <View style={Styles.labels}>
              <Text style={Styles.label}>Kcal:</Text>
              <Text style={Styles.label}>Carbs:</Text>
              <Text style={Styles.label}>Sugar:</Text>
              <Text style={Styles.label}>Protein:</Text>
              <Text style={Styles.label}>Fat:</Text>
            </View>

            <View style={Styles.values}>
              <Text style={Styles.value}>{ kcal.toFixed(2) }</Text>
              <Text style={Styles.value}>{ carbs.toFixed(2) }</Text>
              <Text style={Styles.value}>{ sugar.toFixed(2) }</Text>
              <Text style={Styles.value}>{ protein.toFixed(2) }</Text>
              <Text style={Styles.value}>{ fat.toFixed(2) }</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <ModifyMacroModal isVisible={showModifyMacroModal} reading={reading} onClose={() => setShowModifyMacroModal(false)} update={update} />
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
    justifyContent: 'space-around'
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
