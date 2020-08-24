import React, { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import { WheelPicker } from "../../react-native-wheel-picker-android"

import {
  bgIntegerOptions,
  ketoIntegerOptions,
  defaultOptions,
  doseFractionOptions
} from '../../Helpers/General'

interface WheelSelectorProps {
  updateReading: (reading: number) => void,
  isDose?: boolean,
  isKeto?: boolean
}

const defaultProps = {
  isDose: false,
  isKeto: false
}

const WheelSelector: React.FC<WheelSelectorProps> = (props: WheelSelectorProps) => {
  const { updateReading, isDose, isKeto } = props

  const [integerPart, setIntegerPart] = useState(0)
  const [fractionalPart, setFractionalPart] = useState(0)

  const onIntegerPartSelected = (integer: number) => {
    setIntegerPart(integer)

    const reading = Number(parseFloat(`${integerPart}.${fractionalPart}`).toFixed(1))

    updateReading(reading)
  }

  const onFractionalPartSelected = (fraction: number) => {
    if (isDose) {
      fraction ? setFractionalPart(5) : setFractionalPart(0)
    } else {
      setFractionalPart(fraction)
    }

    const reading = integerPart + (fractionalPart / 10)

    updateReading(reading)
  }
 
  const integerOptions = isKeto ? ketoIntegerOptions : bgIntegerOptions
  const fractionalOptions = isDose ? doseFractionOptions : defaultOptions

  return (
      <View style={Styles.container}>

        <View style={Styles.wheelLeft}>
          <WheelPicker
            selectedItem={integerPart}
            data={integerOptions}
            onItemSelected={onIntegerPartSelected}
            isCyclic={true}
            selectedItemTextSize={30}
            itemTextSize={16}
            selectedItemTextFontFamily={'roboto'}
            itemTextFontFamily={'roboto'}
            height={250}
            width={100}
          />
        </View>

        <View style={Styles.decimalContainer}><Text style={Styles.decimalText}>{'.'}</Text></View>

        <View style={Styles.wheelRight}>
          <WheelPicker
            selectedItem={fractionalPart}
            data={fractionalOptions}
            onItemSelected={onFractionalPartSelected}
            isCyclic={isDose ? false : true}
            selectedItemTextSize={30}
            itemTextSize={16}
            selectedItemTextFontFamily={'roboto'}
            itemTextFontFamily={'roboto'}
            height={250}
            width={100}
          />
        </View>

      </View>
  );
}

WheelSelector.defaultProps = defaultProps

export default WheelSelector


const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  wheelLeft: {
    borderLeftWidth: 1
  },
  decimalContainer: {
    justifyContent: 'center'
  },
  decimalText: {
    fontWeight: 'bold',
    fontSize: 26,
    paddingBottom: 6
  },
  wheelRight: {
    borderRightWidth: 1
  }
})
