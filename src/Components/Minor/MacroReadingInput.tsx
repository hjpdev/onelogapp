import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import MacroSelector from './MacroSelector'
import NewSavedMacroModal from '../Minor/NewSavedMacroModal'
import GradientBorder from '../Minor/GradientBorder'

type MacroReadingInputProps = {
  updateReading: (reading: {[macro: string]: number}) => any
}

const MacroReadingInput: React.FC<MacroReadingInputProps> = (props: MacroReadingInputProps) => {
  const { updateReading } = props

  const [kcal, setKcal] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [sugar, setSugar] = useState(0)
  const [protein, setProtein] = useState(0)
  const [fat, setFat] = useState(0)
  const [showNewSavedMacroModal, setShowNewSavedMacroModal] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    const reading = { kcal, carbs, sugar, protein, fat }
    updateReading(reading)
  }, [kcal, carbs, sugar, protein, fat])

  return(
    <>
    <View style={Styles.container}>
      <MacroSelector hasThousands label={'Kcal:'} updateMacro={setKcal} />
      <MacroSelector hasThousands={false} label={'Carbs (g):'} updateMacro={setCarbs} />
      <MacroSelector hasThousands={false} label={'Sugar (g):'} updateMacro={setSugar} />
      <MacroSelector hasThousands={false} label={'Protein (g):'} updateMacro={setProtein} />
      <MacroSelector hasThousands={false} label={'Fat (g):'} updateMacro={setFat} />
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
  labels: {
    backgroundColor: 'green',
    justifyContent: 'space-evenly'
  },
  savedMacroOptions: {
    flexDirection: 'row',
    marginTop: 24
  },
  label: {
    fontSize: 16,
    backgroundColor: 'yellow'
  }
})
