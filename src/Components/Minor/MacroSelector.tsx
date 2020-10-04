import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { WheelPicker } from '../../react-native-wheel-picker-android'

import { defaultNumSelectorOptions } from '../../Helpers'

type MacroSelectorProps = {
  hasThousands: boolean
  label: string
  value?: number
  updateMacro: Dispatch<SetStateAction<number>>
}

const parseValue = (value: number) => {
  const stringValue = value.toString()
  const integers = stringValue.split('.')[0]
  const decimal = parseInt(stringValue.split('.')[1])
  let thousands, hundreds, tens, ones
  if (integers.length === 4) {
    thousands = parseInt(integers[0])
    hundreds = parseInt(integers[1])
    tens = parseInt(integers[2])
    ones = parseInt(integers[3])
  }
  if (integers.length === 3) {
    hundreds = parseInt(integers[0])
    tens = parseInt(integers[1])
    ones = parseInt(integers[2])
  }
  if (integers.length === 2) {
    tens = parseInt(integers[0])
    ones = parseInt(integers[1])
  }
  if (integers.length === 1) {
    ones = parseInt(integers[0])
  }

  return { thousands, hundreds, tens, ones, decimal }
}

const MacroSelector: React.FC<MacroSelectorProps> = (props: MacroSelectorProps) => {
  const { hasThousands, label, value, updateMacro } = props

  const [thousands, setThousands] = useState((value && parseValue(value).thousands) || 0)
  const [hundreds, setHundreds] = useState((value && parseValue(value).hundreds) || 0)
  const [tens, setTens] = useState((value && parseValue(value).tens) || 0)
  const [ones, setOnes] = useState((value && parseValue(value).ones) || 0)
  const [decimal, setDecimal] = useState((value && parseValue(value).decimal) || 0)

  const generateValue = () => {
    return parseFloat(`${thousands}${hundreds}${tens}${ones}.${decimal}`)
  }

  useEffect(() => {
    const value = generateValue()
    updateMacro(value)
  }, [thousands, hundreds, tens, ones, decimal])

  const onSelection = (setterFunction: Dispatch<SetStateAction<number>>, int: number) => {
    setterFunction(int)
  }

  const generateStyle = () => {
    return hasThousands ? Styles.thousands : Styles.hundreds
  }

  return(
    <View style={Styles.container}>
      <Text style={Styles.label}>{label}</Text>
      <View style={Styles.selectors}>
        {hasThousands &&
        <View>
          <WheelPicker
            selectedItem={thousands}
            data={defaultNumSelectorOptions}
            onItemSelected={int => onSelection(setThousands, int)}
            isCyclic={true}
            selectedItemTextSize={12}
            itemTextSize={8}
            selectedItemTextFontFamily={'roboto'}
            itemTextFontFamily={'roboto'}
            style={generateStyle()}
          />
        </View>}
        <View>
          <WheelPicker
            selectedItem={hundreds}
            data={defaultNumSelectorOptions}
            onItemSelected={int => onSelection(setHundreds, int)}
            isCyclic={true}
            selectedItemTextSize={12}
            itemTextSize={8}
            selectedItemTextFontFamily={'roboto'}
            itemTextFontFamily={'roboto'}
            style={generateStyle()}
          />
        </View>
        <View>
          <WheelPicker
            selectedItem={tens}
            data={defaultNumSelectorOptions}
            onItemSelected={int => onSelection(setTens, int)}
            isCyclic={true}
            selectedItemTextSize={12}
            itemTextSize={8}
            selectedItemTextFontFamily={'roboto'}
            itemTextFontFamily={'roboto'}
            style={generateStyle()}
          />
        </View>
        <View>
          <WheelPicker
            selectedItem={ones}
            data={defaultNumSelectorOptions}
            onItemSelected={int => onSelection(setOnes, int)}
            isCyclic={true}
            selectedItemTextSize={12}
            itemTextSize={8}
            selectedItemTextFontFamily={'roboto'}
            itemTextFontFamily={'roboto'}
            style={generateStyle()}
          />
        </View>
        <Text style={Styles.decimalPoint}>{'.'}</Text>
        <View>
          <WheelPicker
            selectedItem={decimal}
            data={defaultNumSelectorOptions}
            onItemSelected={int => onSelection(setDecimal, int)}
            isCyclic={true}
            selectedItemTextSize={12}
            itemTextSize={8}
            selectedItemTextFontFamily={'roboto'}
            itemTextFontFamily={'roboto'}
            style={generateStyle()}
          />
        </View>
      </View>
    </View>
  )
}

export default MacroSelector


const Styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5
  },
  selectors: {
    flexDirection: 'row',
  },
  label: {
    textAlignVertical: 'bottom',
    paddingBottom: 8,
    paddingLeft: 8
  },
  thousands: {
    width: 32,
    height: 60
  },
  hundreds: {
    width: 40,
    height: 60
  },
  decimalPoint: {
    textAlignVertical: 'bottom',
    paddingBottom: 6
  }
})
