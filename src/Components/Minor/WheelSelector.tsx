import React, { Dispatch, ReactText, SetStateAction, useState } from 'react'
import { Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { WheelSelectorStyles } from './Styles'

interface WheelSelectorProps {
  integerOptions: string[]
  fractionOptions: string[]
  updateData: Dispatch<SetStateAction<number>>
  data?: number
}

export const WheelSelector: React.FC<WheelSelectorProps> = (props: WheelSelectorProps) => {
  const { integerOptions, fractionOptions, updateData, data } = props

  let integer = 0
  let fraction = 0
  if (data) {
    const parts = `${data.toFixed(1)}`.split('.')
    integer = parseInt(parts[0])
    fraction = parseInt(parts[1])
  }

  const [integerPart, setIntegerPart] = useState(integer)
  const [fractionPart, setFractionPart] = useState(fraction)

  const getPickerItems = (items: string[]) => items.map((i) => <Picker.Item key={i} label={`${i}`} value={i} />)

  const onIntegerPartSelected = (itemValue: ReactText, _: number) => {
    setIntegerPart(parseInt(`${itemValue}`))
    const formattedValue = Number(parseFloat(`${itemValue}.${fractionPart}`).toFixed(1))
    updateData(formattedValue)
  }

  const onFractionPartSelected = (itemValue: ReactText, _: number) => {
    setFractionPart(parseInt(`${itemValue}`))
    const formattedValue = integerPart + parseInt(`${itemValue}`) / 10
    updateData(formattedValue)
  }

  return (
    <View style={WheelSelectorStyles.container}>
      <Picker
        selectedValue={`${integerPart}`}
        style={WheelSelectorStyles.pickerLeft}
        itemStyle={WheelSelectorStyles.pickerItem}
        onValueChange={onIntegerPartSelected}
      >
        {getPickerItems(integerOptions)}
      </Picker>
      <View style={WheelSelectorStyles.textContainer}>
        <Text style={WheelSelectorStyles.text}>.</Text>
      </View>
      <Picker
        selectedValue={`${fractionPart}`}
        style={WheelSelectorStyles.pickerRight}
        itemStyle={WheelSelectorStyles.pickerItem}
        onValueChange={onFractionPartSelected}
      >
        {getPickerItems(fractionOptions)}
      </Picker>
    </View>
  )
}

export default WheelSelector
