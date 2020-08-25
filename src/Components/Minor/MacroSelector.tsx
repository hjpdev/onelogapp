import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { WheelPicker } from '../../react-native-wheel-picker-android'

import { defaultOptions } from '../../Helpers/General'

type MacroSelectorProps = {
  hasThousands: boolean,
  updateMacro: Dispatch<SetStateAction<number>>
}

const MacroSelector: React.FC<MacroSelectorProps> = (props: MacroSelectorProps) => {
  const { hasThousands, updateMacro } = props

  const [thousands, setThousands] = useState(0)
  const [hundreds, setHundreds] = useState(0)
  const [tens, setTens] = useState(0)
  const [ones, setOnes] = useState(0)
  const [decimal, setDecimal] = useState(0)

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
      {hasThousands &&
      <View>
        <WheelPicker
          selectedItem={0}
          data={defaultOptions}
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
          selectedItem={0}
          data={defaultOptions}
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
          selectedItem={0}
          data={defaultOptions}
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
          selectedItem={0}
          data={defaultOptions}
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
          selectedItem={0}
          data={defaultOptions}
          onItemSelected={int => onSelection(setDecimal, int)}
          isCyclic={true}
          selectedItemTextSize={12}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          style={generateStyle()}
        />
      </View>
      {hasThousands
        ? <Text style={Styles.unit}>{' '}</Text>
        : <Text style={Styles.unit}>{'g'}</Text>}
    </View>
  )
}

export default MacroSelector


const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
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
  },
  unit: {
    paddingLeft: 6,
    paddingBottom: 6,
    textAlignVertical: 'bottom'
  }
})
