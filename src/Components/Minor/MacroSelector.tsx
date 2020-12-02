import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { MacroSelectorStyles } from './Styles'

interface MacroSelectorProps {
  label: string
  updateMacro: Dispatch<SetStateAction<number>>
  value?: number
  hasThousands?: boolean
}

const parseValue = (value: number | undefined) => {
  const stringValue = value && value.toFixed(1)
  const integers = stringValue && stringValue.split('.')[0]
  const keys = ['ones', 'tens', 'hundreds', 'thousands']
  const keysToUse = integers && keys.slice(0, integers.length)

  const decimal = (stringValue && parseInt(stringValue.split('.')[1])) || 0
  const tmpObj = {
    thousands: 0,
    hundreds: 0,
    tens: 0,
    ones: 0,
    decimal
  } as any

  if (integers && keysToUse) {
    for (let i = 0; i < integers.length; i++) {
      const key = keysToUse.reverse()[i]
      tmpObj[key] = parseInt(integers[i])
    }
  }

  return tmpObj
}

export const MacroSelector: React.FC<MacroSelectorProps> = (props: MacroSelectorProps) => {
  const { hasThousands, label, value, updateMacro } = props

  const amount = parseValue(value)

  console.log('VALLUE IN SELECTOR => ', value)
  console.log('AMOUNT IN SLEECTOR => ', amount)

  const [thousands, setThousands] = useState(amount.thousands)
  const [hundreds, setHundreds] = useState(amount.hundreds)
  const [tens, setTens] = useState(amount.tens)
  const [ones, setOnes] = useState(amount.ones)
  const [decimal, setDecimal] = useState(amount.decimal)

  const generateValue = () => parseFloat(`${thousands}${hundreds}${tens}${ones}.${decimal}`)

  useEffect(() => {
    const value = generateValue()
    updateMacro(value)
  }, [thousands, hundreds, tens, ones, decimal])

  const onSelection = (setterFunction: Dispatch<SetStateAction<number>>, int: number) => {
    setterFunction(int)
  }

  const generateStyle = () => (hasThousands ? MacroSelectorStyles.thousands : MacroSelectorStyles.hundreds)

  return null
  // <View style={MacroSelectorStyles.container}>
  //   <Text style={MacroSelectorStyles.label}>{label}</Text>
  //   <View style={MacroSelectorStyles.selectors}>
  //     {hasThousands
  // && (
  // <View>
  //   <WheelPicker
  //     selectedItem={thousands}
  //     data={defaultNumSelectorOptions}
  //     onItemSelected={(int) => onSelection(setThousands, int)}
  //     isCyclic
  //     selectedItemTextSize={12}
  //     itemTextSize={8}
  //     selectedItemTextFontFamily="roboto"
  //     itemTextFontFamily="roboto"
  //     style={generateStyle()}
  //   />
  // </View>
  // )}
  // <View>
  //   <WheelPicker
  //     selectedItem={hundreds}
  //     data={defaultNumSelectorOptions}
  //     onItemSelected={(int) => onSelection(setHundreds, int)}
  //     isCyclic
  //     selectedItemTextSize={12}
  //     itemTextSize={8}
  //     selectedItemTextFontFamily="roboto"
  //     itemTextFontFamily="roboto"
  //     style={generateStyle()}
  //   />
  // </View>
  // <View>
  //   <WheelPicker
  //     selectedItem={tens}
  //     data={defaultNumSelectorOptions}
  //     onItemSelected={(int) => onSelection(setTens, int)}
  //     isCyclic
  //     selectedItemTextSize={12}
  //     itemTextSize={8}
  //     selectedItemTextFontFamily="roboto"
  //     itemTextFontFamily="roboto"
  //     style={generateStyle()}
  //   />
  // </View>
  // <View>
  //   <WheelPicker
  //     selectedItem={ones}
  //     data={defaultNumSelectorOptions}
  //     onItemSelected={(int) => onSelection(setOnes, int)}
  //     isCyclic
  //     selectedItemTextSize={12}
  //     itemTextSize={8}
  //     selectedItemTextFontFamily="roboto"
  //     itemTextFontFamily="roboto"
  //     style={generateStyle()}
  //   />
  // </View>
  // <Text style={MacroSelectorStyles.decimalPoint}>.</Text>
  // <View>
  //   <WheelPicker
  //     selectedItem={decimal}
  //     data={defaultNumSelectorOptions}
  //     onItemSelected={(int) => onSelection(setDecimal, int)}
  //     isCyclic
  //     selectedItemTextSize={12}
  //     itemTextSize={8}
  //     selectedItemTextFontFamily="roboto"
  //     itemTextFontFamily="roboto"
  //     style={generateStyle()}
  //   />
  // </View>
  //   </View>
  // </View>
  // )
}
