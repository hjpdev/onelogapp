import React, { Dispatch, SetStateAction, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import WheelPicker from '../../react-native-wheel-picker-android'

import {
  bgIntegerOptions,
  ketoIntegerOptions,
  defaultNumSelectorOptions,
  doseFractionOptions
} from '../../Helpers'

type WheelSelectorProps = {
  updateData: Dispatch<SetStateAction<number>>
  data?: number
  isDose?: boolean
  isKeto?: boolean
}

const WheelSelector: React.FC<WheelSelectorProps> = (props: WheelSelectorProps) => {
  const { updateData, data, isDose, isKeto } = props

  let integer; let
    fraction
  if (data) {
    const parts = `${data.toFixed(1)}`.split('.')
    integer = parseInt(parts[0])
    fraction = parseInt(parts[1])
  }

  const [integerPart, setIntegerPart] = useState(integer || 0)
  const [fractionalPart, setFractionalPart] = useState(fraction || 0)

  const onIntegerPartSelected = (integer: number) => {
    setIntegerPart(integer)

    const data = Number(parseFloat(`${integerPart}.${fractionalPart}`).toFixed(1))

    updateData(data)
  }

  const onFractionalPartSelected = (fraction: number) => {
    if (isDose) {
      fraction ? setFractionalPart(5) : setFractionalPart(0)
    } else {
      setFractionalPart(fraction)
    }

    const data = integerPart + (fractionalPart / 10)

    updateData(data)
  }

  const integerOptions = isKeto ? ketoIntegerOptions : bgIntegerOptions
  const fractionalOptions = isDose ? doseFractionOptions : defaultNumSelectorOptions

  return (
    <View style={Styles.container}>
      <View style={Styles.wheelLeft}>
        <WheelPicker
          selectedItem={integerPart}
          data={integerOptions}
          onItemSelected={onIntegerPartSelected}
          isCyclic
          selectedItemTextSize={30}
          itemTextSize={16}
          selectedItemTextFontFamily="roboto"
          itemTextFontFamily="roboto"
          style={Styles.wheel}
        />
      </View>

      <View style={Styles.decimalContainer}><Text style={Styles.decimalText}>.</Text></View>

      <View style={Styles.wheelRight}>
        <WheelPicker
          selectedItem={fractionalPart}
          data={fractionalOptions}
          onItemSelected={onFractionalPartSelected}
          isCyclic={!isDose}
          selectedItemTextSize={30}
          itemTextSize={16}
          selectedItemTextFontFamily="roboto"
          itemTextFontFamily="roboto"
          style={Styles.wheel}
        />
      </View>
    </View>
  );
}

export default WheelSelector

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  wheel: {
    height: 250,
    width: 100
  },
  wheelLeft: {
    borderLeftWidth: 0.7
  },
  wheelRight: {
    borderRightWidth: 0.7
  },
  decimalContainer: {
    justifyContent: 'center'
  },
  decimalText: {
    fontWeight: 'bold',
    fontSize: 26,
    paddingBottom: 18
  }
})
