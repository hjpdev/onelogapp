import React from 'react'
import Modal from 'react-native-modal'
import { Text, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import MacroCollectionEntry from './MacroCollectionEntry'
import { ChoiceButtons, GradientBorder } from '../../Minor'
import { MacroReadingData } from '../../../types'
import { CollectionSummaryModalStyles } from './Styles'

interface MacroCollectionSummaryModalProps {
  isVisible: boolean
  collection: typeof MacroCollectionEntry[]
  onClose: () => void
  removeEntry: (key: string) => void
  clearCollection: () => void
  updateReading: (macros: MacroReadingData) => void
}

const MacroCollectionSummaryModal: React.FC<MacroCollectionSummaryModalProps> = (
  props: MacroCollectionSummaryModalProps
) => {
  const { isVisible, collection, onClose, removeEntry, clearCollection, updateReading } = props

  const navigation = useNavigation()

  const getMacros = () => {
    const tmpObj: MacroReadingData = {
      kcal: 0,
      carbs: 0,
      sugar: 0,
      protein: 0,
      fat: 0
    }
    collection.forEach((entry: any) => {
      const keys = Object.keys(tmpObj)
      keys.forEach((key) => {
        tmpObj[key]
          += (parseFloat(entry.reading[key].toFixed(1)) * parseInt(entry.amount)) / parseInt(entry.reading.amount)
      })
    })

    return tmpObj
  }

  const getEntries = () => {
    const tmpArr: React.ReactNode[] = []
    collection.forEach((entry: any) => {
      const { reading } = entry
      tmpArr.push(
        <MacroCollectionEntry
          amount={entry.amount}
          reading={reading}
          key={`${reading.id}-${entry.amount}`}
          removeEntry={removeEntry}
        />
      )
    })

    return tmpArr
  }

  const macros = getMacros()

  const calorieBreakdown = () => {
    const carbsCal = parseFloat(((macros.carbs * 4 * 100) / macros.kcal).toFixed(1))
    const proteinCal = parseFloat(((macros.protein * 4 * 100) / macros.kcal).toFixed(1))
    const fatCal = parseFloat(((macros.fat * 9 * 100) / macros.kcal).toFixed(1))

    return { carbsCal, proteinCal, fatCal }
  }

  const handleSubmit = () => {
    updateReading(macros)
    navigation.navigate('NewMacroReading', { macros })
  }

  const calories = calorieBreakdown()
  const entries = getEntries()

  return (
    <>
      <Modal
        isVisible={isVisible}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={1000}
        animationOutTiming={1000}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        backdropOpacity={0.2}
        style={CollectionSummaryModalStyles.modal}
      >
        <View style={CollectionSummaryModalStyles.readingContainer}>
          <View style={CollectionSummaryModalStyles.labels}>
            <Text style={CollectionSummaryModalStyles.label}>Kcal:</Text>
            <Text style={CollectionSummaryModalStyles.label}>Carbs (g):</Text>
            <Text style={CollectionSummaryModalStyles.label}>Sugar (g):</Text>
            <Text style={CollectionSummaryModalStyles.label}>Protein (g):</Text>
            <Text style={CollectionSummaryModalStyles.label}>Fat (g):</Text>
          </View>

          <View style={CollectionSummaryModalStyles.numbers}>
            <View style={CollectionSummaryModalStyles.values}>
              <Text style={CollectionSummaryModalStyles.value}>{`${macros.kcal.toFixed(2)}`}</Text>
              <Text style={CollectionSummaryModalStyles.value}>{`${macros.carbs.toFixed(2)}`}</Text>
              <Text style={CollectionSummaryModalStyles.value}>{`${macros.sugar.toFixed(2)}`}</Text>
              <Text style={CollectionSummaryModalStyles.value}>{`${macros.protein.toFixed(2)}`}</Text>
              <Text style={CollectionSummaryModalStyles.value}>{`${macros.fat.toFixed(2)}`}</Text>
            </View>
            <View style={CollectionSummaryModalStyles.percentages}>
              <Text style={CollectionSummaryModalStyles.percentage} />
              <Text style={CollectionSummaryModalStyles.percentage}>
                {`${
                  calories.carbsCal ? `${calories.carbsCal.toFixed(1)}%` : ''
                }`}
              </Text>
              <Text style={CollectionSummaryModalStyles.percentage} />
              <Text style={CollectionSummaryModalStyles.percentage}>
                {`${
                  calories.proteinCal ? `${calories.proteinCal.toFixed(1)}%` : ''
                }`}
              </Text>
              <Text style={CollectionSummaryModalStyles.percentage}>
                {`${
                  calories.fatCal ? `${calories.fatCal.toFixed(1)}%` : ''
                }`}
              </Text>
            </View>
          </View>
        </View>
        <GradientBorder x={1.0} y={1.0} />
        <ScrollView style={CollectionSummaryModalStyles.entries}>{entries}</ScrollView>
        <ChoiceButtons
          confirmationText="Add"
          cancellationText="Clear"
          onSubmit={async () => handleSubmit()}
          onClose={clearCollection}
        />
      </Modal>
    </>
  )
}

export default MacroCollectionSummaryModal
