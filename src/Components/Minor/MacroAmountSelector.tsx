import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { WheelPicker } from '../../react-native-wheel-picker-android'

import { defaultNumSelectorOptions } from '../../Helpers'

type MacroSelectorProps = {
  updateAmount: Dispatch<SetStateAction<number>>
  updateUnit: Dispatch<SetStateAction<string>>
}

const MacroAmountSelector: React.FC<MacroSelectorProps> = (props: MacroSelectorProps) => {
  const { updateAmount, updateUnit } = props

  const [hundreds, setHundreds] = useState(0)
  const [tens, setTens] = useState(0)
  const [ones, setOnes] = useState(0)

  const generateAmount = () => {
    return parseFloat(`${hundreds}${tens}${ones}`)
  }

  useEffect(() => {
    const amount = generateAmount()
    updateAmount(amount)
  }, [hundreds, tens, ones])

  const onSelection = (setterFunction: Dispatch<SetStateAction<number>>, int: number) => {
    setterFunction(int)
  }

  return(
    <View style={Styles.container}>
      <View>
        <WheelPicker
          selectedItem={0}
          data={defaultNumSelectorOptions}
          onItemSelected={int => onSelection(setHundreds, int)}
          isCyclic={true}
          selectedItemTextSize={12}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          style={Styles.hundreds}
        />
      </View>
      <View>
        <WheelPicker
          selectedItem={0}
          data={defaultNumSelectorOptions}
          onItemSelected={int => onSelection(setTens, int)}
          isCyclic={true}
          selectedItemTextSize={12}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          style={Styles.hundreds}
        />
      </View>
      <View>
        <WheelPicker
          selectedItem={0}
          data={defaultNumSelectorOptions}
          onItemSelected={int => onSelection(setOnes, int)}
          isCyclic={true}
          selectedItemTextSize={12}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          style={Styles.hundreds}
        />
      </View>
      <View style={{ justifyContent: 'flex-end' }}>
        <TextInput placeholder={'Unit'} onChangeText={updateUnit} style={Styles.textInput} />
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
  }
})
