import React from 'react'
import { Text, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'

import GradientBorder from '../../Minor/GradientBorder'
import MacroCollectionEntry from './MacroCollectionEntry'
import { TMacroCollectionEntry } from '../SavedMacros'

type Macros = {
  kcal: number
  carbs: number
  sugar: number
  protein: number
  fat: number
}

type MacroCollectionSummaryModalProps = {
  isVisible: boolean
  collection: TMacroCollectionEntry[]
  onClose: () => void
  removeEntry: (key: string) => void
  clearCollection: () => void
}

const MacroCollectionSummaryModal: React.FC<MacroCollectionSummaryModalProps> = (props: MacroCollectionSummaryModalProps) => {
  const { isVisible, collection, onClose, removeEntry, clearCollection } = props

  const navigation = useNavigation()

  const getMacros = () => {
    const tmpObj: Macros = { kcal: 0, carbs: 0, sugar: 0, protein: 0, fat: 0 }
    collection.forEach((entry: any) => {
      const keys = Object.keys(tmpObj)
      keys.forEach((key) => {
        tmpObj[key] += parseFloat(entry.reading[key].toFixed(1)) * parseInt(entry.amount) / parseInt(entry.reading.amount)
      })
    })

    return tmpObj
  }

  const getEntries = () => {
    const tmpArr: React.ReactNode[] = []
    collection.forEach((entry: any) => {
      const reading = entry.reading
      tmpArr.push(<MacroCollectionEntry amount={entry.amount} reading={reading} key={`${reading.id}-${entry.amount}`} removeEntry={removeEntry} />)
    })

    return tmpArr
  }

  const macros = getMacros()

  const calorieBreakdown = () => {
    const carbsCal = parseFloat(((macros.carbs * 4) * 100 / macros.kcal).toFixed(1))
    const proteinCal = parseFloat(((macros.protein * 4) * 100 / macros.kcal).toFixed(1))
    const fatCal = parseFloat(((macros.fat * 9) * 100 / macros.kcal).toFixed(1))

    return { carbsCal, proteinCal, fatCal }
  }
  const calories = calorieBreakdown()
  const entries = getEntries()

  return(
	<>
  <Modal
    isVisible={isVisible}
    animationIn='fadeInUp'
    animationOut='fadeOutDown'
    animationInTiming={500}
    animationOutTiming={500}
    onBackButtonPress={onClose}
    onBackdropPress={onClose}
    backdropOpacity={0.2}
    style={Styles.modal}>
    <View style={Styles.readingContainer}>
      <View style={Styles.labels}>
        <Text style={Styles.label}>{'Kcal:'}</Text>
        <Text style={Styles.label}>{'Carbs:'}</Text>
        <Text style={Styles.label}>{'Sugar:'}</Text>
        <Text style={Styles.label}>{'Protein:'}</Text>
        <Text style={Styles.label}>{'Fat:'}</Text>
      </View>

      <View style={Styles.numbers}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <View style={Styles.values}>
            <Text style={Styles.value}>{`${macros.kcal.toFixed(2)}`}</Text>
            <Text style={Styles.value}>{`${macros.carbs.toFixed(2)}`}</Text>
            <Text style={Styles.value}>{`${macros.sugar.toFixed(2)}`}</Text>
            <Text style={Styles.value}>{`${macros.protein.toFixed(2)}`}</Text>
            <Text style={Styles.value}>{`${macros.fat.toFixed(2)}`}</Text>
          </View>
          <View style={{ paddingRight: 4 }}>
            <Text></Text>
            <Text>g</Text>
            <Text>g</Text>
            <Text>g</Text>
            <Text>g</Text>
          </View>
        </View>
        <View style={Styles.percentages}>
          <Text style={Styles.percentage} />
          <Text style={Styles.percentage}>{`${calories.carbsCal ? calories.carbsCal.toFixed(1) + '%' : ''}`}</Text>
          <Text style={Styles.percentage} />
          <Text style={Styles.percentage}>{`${calories.proteinCal ? calories.proteinCal.toFixed(1) + '%' : ''}`}</Text>
          <Text style={Styles.percentage}>{`${calories.fatCal ? calories.fatCal.toFixed(1) + '%' : ''}`}</Text>
        </View>
      </View>
    </View>
    <GradientBorder x={1.0} y={1.0} />
    <ScrollView style={Styles.entries}>
      {entries}
    </ScrollView>
    <View style={Styles.buttons}>
      <View style={{ width: '50%', borderTopWidth: 1 }}>
        <TouchableOpacity onPress={clearCollection} style={Styles.button}>
          <Text style={Styles.buttonText}>{'Clear'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '50%', borderLeftWidth: 1, borderTopWidth: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate('NewMacroReading', { macros })} style={Styles.button}>
          <Text style={Styles.buttonText}>{'Add'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
	</>
  )
}

export default MacroCollectionSummaryModal


const Styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    width: '80%',
    height: '50%',
    flex: 0,
    top: '20%',
    borderRadius: 2,
    borderWidth: 1
  },
  readingContainer: {
    width: '90%',
    margin: 4,
    marginVertical: 18,
    borderRadius: 2,
    borderWidth: 1.2,
    flexDirection: 'row',
    backgroundColor: '#ebebeb',
    justifyContent: 'space-between'
  },
  labels: {
    flexDirection: 'column',
    padding: 10
  },
  label: {
    fontSize: 14,
    color: '#3f3d3d'
  },
  numbers: {
    flexDirection: 'row',
    width: '50%'
  },
  values: {
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-around'
  },
  value: {
    fontSize: 14,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: 'black'
  },
  percentages: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  percentage: {
    paddingRight: 4
  },
  entries: {
    width: '100%'
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 8
  },
  button: {
    padding: 8
  },
  buttonText: {
    width: '100%',
    textAlign: 'center'
  }
})
