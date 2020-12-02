import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import NewSavedMacroModal from '../SavedMacros/NewSavedMacroModal'
import { GradientBorder } from './GradientBorder'
import { MacroReadingData, MacroReadingKey } from '../../types'
import { MacroSelector } from './MacroSelector'
import { MacroReadingInputStyles } from './Styles'

interface MacroReadingInputProps {
  showSavedMacroOptions: boolean
  updateReading: (reading: MacroReadingData) => void
  showClearOption?: boolean
  reading?: MacroReadingData
}

export const MacroReadingInput: React.FC<MacroReadingInputProps> = (props: MacroReadingInputProps) => {
  const { showSavedMacroOptions, updateReading, reading, showClearOption } = props

  const navigation = useNavigation()

  const parseData = () => {
    const tmpObj = {} as MacroReadingData

    reading &&
      Object.keys(reading).forEach((macro: MacroReadingKey) => {
        tmpObj[macro] =
          typeof reading[macro] === 'string' ? parseFloat(reading[macro]) : parseFloat(reading[macro].toFixed(1))
      })

    return tmpObj
  }

  const macros = parseData()

  const [kcal, setKcal] = useState(macros.kcal)
  const [carbs, setCarbs] = useState(macros.carbs)
  const [sugar, setSugar] = useState(macros.sugar)
  const [protein, setProtein] = useState(macros.protein)
  const [fat, setFat] = useState(macros.fat)

  const [showNewSavedMacroModal, setShowNewSavedMacroModal] = useState(false)

  useEffect(() => {
    const reading = {
      kcal,
      carbs,
      sugar,
      protein,
      fat
    }
    updateReading(reading)
  }, [kcal, carbs, sugar, protein, fat])

  const clearMacros = () => {
    setKcal(0)
    setCarbs(0)
    setSugar(0)
    setProtein(0)
    setFat(0)
    const reading = {
      kcal,
      carbs,
      sugar,
      protein,
      fat
    }
    updateReading(reading)
  }

  return (
    <>
      {showClearOption && (
        <TouchableOpacity onPress={() => clearMacros()}>
          <Text>Clear</Text>
        </TouchableOpacity>
      )}
      <View style={MacroReadingInputStyles.container}>
        <GradientBorder x={1.0} y={1.0} />
        <MacroSelector hasThousands value={kcal} label="Kcal:" updateMacro={setKcal} />
        <MacroSelector hasThousands={false} value={carbs} label="Carbs (g):" updateMacro={setCarbs} />
        <MacroSelector hasThousands={false} value={sugar} label="Sugar (g):" updateMacro={setSugar} />
        <MacroSelector hasThousands={false} value={protein} label="Protein (g):" updateMacro={setProtein} />
        <MacroSelector hasThousands={false} value={fat} label="Fat (g):" updateMacro={setFat} />
        <GradientBorder x={1.0} y={1.0} />
        {showSavedMacroOptions && (
          <View style={MacroReadingInputStyles.savedMacroOptions}>
            <View style={{ width: '50%', borderRightWidth: 1 }}>
              <TouchableOpacity onPress={() => setShowNewSavedMacroModal(true)}>
                <Text style={{ fontSize: 16, textAlign: 'center', padding: 8 }}>Save as</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%' }}>
              <TouchableOpacity onPress={() => navigation.navigate('SavedMacros')}>
                <Text style={{ fontSize: 16, textAlign: 'center', padding: 8 }}>Saved</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <NewSavedMacroModal
        isVisible={showNewSavedMacroModal}
        onClose={() => setShowNewSavedMacroModal(false)}
        macros={{
          kcal,
          carbs,
          sugar,
          protein,
          fat
        }}
      />
    </>
  )
}
