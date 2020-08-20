import React, { useState } from "react"
import { Text, View } from "react-native"
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
  isKeto?: boolean,
  width?: number,
  height?: number
}

const defaultProps = {
  isDose: false,
  isKeto: false,
  width: 50,
  height: 250
}

const WheelSelector: React.FC<WheelSelectorProps> = (props: WheelSelectorProps) => {
  const { updateReading, isDose, isKeto, width, height } = props

  const [integerPart, setIntegerPart] = useState(0)
  const [fractionalPart, setFractionalPart] = useState(0)

  const onIntegerPartSelected = integer => {
    setIntegerPart(integer)

    const reading = parseFloat(`${integerPart}.${fractionalPart}`).toFixed(1)

    updateReading(reading)
  }

  const onFractionalPartSelected = fraction => {
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
    <View style={{padding: 10, justifyContent: 'center'}}>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>

        <View style={{borderLeftWidth: 0.5}}>
          <WheelPicker
            selectedItem={integerPart}
            data={integerOptions}
            onItemSelected={onIntegerPartSelected}
            isCyclic={true}
            selectedItemTextSize={30}
            itemTextSize={16}
            width={width}
            height={height}
          />
        </View>

        <View style={{paddingTop: 95 }}><Text style={{fontWeight: 'bold', fontSize: 26}}>{'.'}</Text></View>

        <View style={{borderRightWidth: 0.5}}>
          <WheelPicker
            selectedItem={fractionalPart}
            data={fractionalOptions}
            onItemSelected={onFractionalPartSelected}
            isCyclic={isDose ? false : true}
            selectedItemTextSize={30}
            itemTextSize={16}
          />
        </View>

      </View>

    </View>
  );
}

WheelSelector.defaultProps = defaultProps

export default WheelSelector
