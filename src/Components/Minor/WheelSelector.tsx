import React, { Dispatch, ReactText, SetStateAction, useState } from 'react'
import { Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { WheelSelectorStyles } from './Styles'

interface WheelSelectorProps {
  integerOptions: string[]
  fractionOptions: string[]
  updateData: Dispatch<SetStateAction<number>>
  data?: number
  isDose?: boolean
}

export const WheelSelector: React.FC<WheelSelectorProps> = (props: WheelSelectorProps) => {
  const { integerOptions, fractionOptions, updateData, data, isDose } = props

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
    const data = Number(parseFloat(`${itemValue}.${fractionPart}`).toFixed(1))
    updateData(data)
  }

  const onFractionPartSelected = (itemValue: ReactText, _: number) => {
    setFractionPart(parseInt(`${itemValue}`))
    const data = integerPart + parseInt(`${itemValue}`) / 10
    updateData(data)
  }

  return (
    <View style={WheelSelectorStyles.container}>
      <Picker
        selectedValue={`${integerPart}`}
        style={WheelSelectorStyles.picker}
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
        style={WheelSelectorStyles.picker}
        itemStyle={WheelSelectorStyles.pickerItem}
        onValueChange={onFractionPartSelected}
      >
        {getPickerItems(fractionOptions)}
      </Picker>
    </View>
  )
}
