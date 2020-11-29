import React, { Dispatch, ReactText, SetStateAction, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

type WheelSelectorProps = {
  integerOptions: string[]
  fractionOptions: string[]
  updateData: Dispatch<SetStateAction<number>>
  data?: number
  isDose?: boolean
}

const WheelSelector: React.FC<WheelSelectorProps> = (props: WheelSelectorProps) => {
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

  const getPickerItems = (items: string[]) => {
    return items.map(i => {
      return <Picker.Item label={`${i}`} value={i} />
    })
  }

  const onIntegerPartSelected = (itemValue: ReactText, _: number) => {
    setIntegerPart(parseInt(`${itemValue}`))
    const data = Number(parseFloat(`${itemValue}.${fractionPart}`).toFixed(1))
    updateData(data)
  }

  const onFractionPartSelected = (itemValue: ReactText, _: number) => {
    setFractionPart(parseInt(`${itemValue}`))
    const data = integerPart + (parseInt(`${itemValue}`) / 10)
    updateData(data)
  }

  return (
    <View style={Styles.container}>
      <Picker
        selectedValue={`${integerPart}`}
        style={Styles.picker}
        itemStyle={Styles.pickerItem}
        onValueChange={onIntegerPartSelected}
      >
        { getPickerItems(integerOptions) }
      </Picker>
      <View style={Styles.textContainer}>
        <Text style={Styles.text}>{'.'}</Text>
      </View>
      <Picker
        selectedValue={`${fractionPart}`}
        style={Styles.picker}
        itemStyle={Styles.pickerItem}
        onValueChange={onFractionPartSelected}
      >
        { getPickerItems(fractionOptions) }
      </Picker>
    </View>
  )
}

export default WheelSelector


const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderLeftWidth: 0.7,
    borderRightWidth: 0.7
  },
  picker: {
    height: 200,
    width: 140,
    justifyContent: 'center'
  },
  pickerItem: {
    height: '100%'
  },
  textContainer: {
    justifyContent: 'center'
  },
  text: {
    fontSize: 40
  }
})
