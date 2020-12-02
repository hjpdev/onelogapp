import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native'

import { MacroAmountSelectorStyles } from './Styles'

interface MacroSelectorProps {
  updateAmount: Dispatch<SetStateAction<number>>
  updateUnit?: Dispatch<SetStateAction<string>>
  unit?: string
  amount?: number
  allowEditUnit?: boolean
}

const parseAmount = (value: number) => {
  const stringValue = value.toString()
  let hundreds
  let tens
  let ones
  if (stringValue.length === 3) {
    hundreds = parseInt(stringValue[0])
    tens = parseInt(stringValue[1])
    ones = parseInt(stringValue[2])
  }
  if (stringValue.length === 2) {
    tens = parseInt(stringValue[0])
    ones = parseInt(stringValue[1])
  }
  if (stringValue.length === 1) {
    ones = parseInt(stringValue[0])
  }

  return { hundreds, tens, ones }
}

export const MacroAmountSelector: React.FC<MacroSelectorProps> = (props: MacroSelectorProps) => {
  const { updateAmount, updateUnit, allowEditUnit, amount, unit } = props

  const [hundreds, setHundreds] = useState((amount && parseAmount(amount).hundreds) || 0)
  const [tens, setTens] = useState((amount && parseAmount(amount).tens) || 0)
  const [ones, setOnes] = useState((amount && parseAmount(amount).ones) || 0)

  const generateAmount = () => parseFloat(`${hundreds}${tens}${ones}`)

  useEffect(() => {
    const amount = generateAmount()
    updateAmount(amount)
  }, [hundreds, tens, ones])

  const onSelection = (setterFunction: Dispatch<SetStateAction<number>>, int: number) => {
    setterFunction(int)
  }

  return (
    <View style={MacroAmountSelectorStyles.container}>
      {/* <View>
        <WheelPicker
          selectedItem={(amount && parseAmount(amount).hundreds) || 0}
          data={defaultNumSelectorOptions}
          onItemSelected={(int) => onSelection(setHundreds, int)}
          isCyclic
          selectedItemTextSize={12}
          itemTextSize={8}
          selectedItemTextFontFamily="roboto"
          itemTextFontFamily="roboto"
          style={MacroAmountSelectorStyles.hundreds}
        />
      </View>
      <View>
        <WheelPicker
          selectedItem={(amount && parseAmount(amount).tens) || 0}
          data={defaultNumSelectorOptions}
          onItemSelected={(int) => onSelection(setTens, int)}
          isCyclic
          selectedItemTextSize={12}
          itemTextSize={8}
          selectedItemTextFontFamily="roboto"
          itemTextFontFamily="roboto"
          style={MacroAmountSelectorStyles.hundreds}
        />
      </View>
      <View>
        <WheelPicker
          selectedItem={(amount && parseAmount(amount).ones) || 0}
          data={defaultNumSelectorOptions}
          onItemSelected={(int) => onSelection(setOnes, int)}
          isCyclic
          selectedItemTextSize={12}
          itemTextSize={8}
          selectedItemTextFontFamily="roboto"
          itemTextFontFamily="roboto"
          style={MacroAmountSelectorStyles.hundreds}
        />
      </View> */}
      <View style={{ justifyContent: 'flex-end' }}>
        {allowEditUnit ? (
          <TextInput placeholder={unit || 'Unit'} onChangeText={updateUnit} style={MacroAmountSelectorStyles.textInput} />
        ) : (
          <Text style={MacroAmountSelectorStyles.text}>{unit || 'Units'}</Text>
        )}
      </View>
    </View>
  )
}
