import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import MacroSelector from './MacroSelector'
import NewSavedMacroModal from '../Minor/NewSavedMacroModal'
import GradientBorder from '../Minor/GradientBorder'

type MacroReadingInputProps = {
  showSavedMacroOptions: boolean
  updateReading: (reading: {[macro: string]: number}) => any
  data?: {[key: string]: number | string}
}

const parseData = (data: {[key: string]: any} | undefined) => {
  if (!data) {
    return { kcal: 0, carbs: 0, sugar: 0, protein: 0, fat: 0 }
  }

  const k = parseFloat(data.kcal)
  const c = parseFloat(data.carbs)
  const s = parseFloat(data.sugar)
  const p = parseFloat(data.protein)
  const f = parseFloat(data.fat)

  return { kcal: k, carbs: c, sugar: s, protein: p, fat: f }
}

const MacroReadingInput: React.FC<MacroReadingInputProps> = (props: MacroReadingInputProps) => {
  const { showSavedMacroOptions, data, updateReading } = props

  const [kcal, setKcal] = useState(parseData(data).kcal)
  const [carbs, setCarbs] = useState(parseData(data).carbs)
  const [sugar, setSugar] = useState(parseData(data).sugar)
  const [protein, setProtein] = useState(parseData(data).protein)
  const [fat, setFat] = useState(parseData(data).fat)
  const [showNewSavedMacroModal, setShowNewSavedMacroModal] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    const reading = { kcal, carbs, sugar, protein, fat }
    updateReading(reading)
  }, [kcal, carbs, sugar, protein, fat])

  return(
    <>
    <View style={Styles.container}>
      <MacroSelector hasThousands label={'Kcal:'} value={kcal} updateMacro={setKcal} />
      <MacroSelector hasThousands={false} value={carbs} label={'Carbs (g):'} updateMacro={setCarbs} />
      <MacroSelector hasThousands={false} value={sugar} label={'Sugar (g):'} updateMacro={setSugar} />
      <MacroSelector hasThousands={false} value={protein} label={'Protein (g):'} updateMacro={setProtein} />
      <MacroSelector hasThousands={false} value={fat} label={'Fat (g):'} updateMacro={setFat} />
      {showSavedMacroOptions &&
        <View style={Styles.savedMacroOptions}>
          <TouchableOpacity style={{ width: '50%' }} onPress={() => setShowNewSavedMacroModal(true)} >
            <GradientBorder x={1.0} y={1.0} />
            <Text style={{ fontSize: 16, textAlign: 'center', padding: 8 }}>Save as</Text>
            <GradientBorder x={1.0} y={1.0} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '50%' }} onPress={() => navigation.navigate('SavedMacros')}>
            <GradientBorder x={1.0} y={1.0} />
            <Text style={{ fontSize: 16, textAlign: 'center', padding: 8 }}>Saved</Text>
            <GradientBorder x={1.0} y={1.0} />
          </TouchableOpacity>
        </View>
      }
    </View>
    <NewSavedMacroModal isVisible={showNewSavedMacroModal} onClose={() => setShowNewSavedMacroModal(false)} macros={{ kcal, carbs, sugar, protein, fat }} />
    </>
  )
}

export default MacroReadingInput


const Styles = StyleSheet.create({
  container: {
    width: '67%',
  },
  savedMacroOptions: {
    flexDirection: 'row',
    marginTop: 24
  }
})
