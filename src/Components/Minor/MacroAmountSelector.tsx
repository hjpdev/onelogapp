import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import WheelPicker from '../../react-native-wheel-picker-android'

import { defaultNumSelectorOptions } from '../../Helpers'

type MacroSelectorProps = {
  updateAmount: Dispatch<SetStateAction<number>>
  updateUnit?: Dispatch<SetStateAction<string>>
  allowEditUnit?: boolean
  amount?: number
  unit?: string
}

const parseAmount = (value: number) => {
  const stringValue = value.toString()
  let hundreds, tens, ones
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

const MacroAmountSelector: React.FC<MacroSelectorProps> = (props: MacroSelectorProps) => {
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
    <View style={Styles.container}>
      <View>
        <WheelPicker
          selectedItem={(amount && parseAmount(amount).hundreds) || 0}
          data={defaultNumSelectorOptions}
          onItemSelected={(int) => onSelection(setHundreds, int)}
          isCyclic
          selectedItemTextSize={12}
          itemTextSize={8}
          selectedItemTextFontFamily="roboto"
          itemTextFontFamily="roboto"
          style={Styles.hundreds}
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
          style={Styles.hundreds}
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
          style={Styles.hundreds}
        />
      </View>
      <View style={{ justifyContent: 'flex-end' }}>
        {allowEditUnit
          ? <TextInput placeholder={unit || 'Unit'} onChangeText={updateUnit} style={Styles.textInput} />
          : <Text style={Styles.text}>{unit || 'Units'}</Text>}
      </View>
    </View>
  )
}

export default MacroAmountSelector

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  hundreds: {
    width: 40,
    height: 60
  },
  textInput: {
    paddingBottom: 6,
    paddingLeft: 10,
    height: 34
  },
  text: {
    paddingBottom: 6,
    paddingLeft: 10
  }
})
