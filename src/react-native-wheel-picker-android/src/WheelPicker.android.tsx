/**
 * @prettier
 * @flow
 * */

import React from 'react'
import { requireNativeComponent } from 'react-native'

const WheelPickerView = requireNativeComponent('WheelPicker')

type Props = {
  data: Array<string>,
  isCyclic?: boolean,
  selectedItemTextColor?: string,
  selectedItemTextSize?: number,
  indicatorWidth?: number,
  hideIndicator?: boolean,
  indicatorColor?: string,
  itemTextColor?: string,
  itemTextSize?: number,
  selectedItem?: number,
  backgroundColor?: string,
  onItemSelected?: (n: number) => void
}

const WheelPicker: React.FC<Props> = (props) => {
  const onItemSelected = (event: any) => {
    if (props.onItemSelected) {
      props.onItemSelected(event.nativeEvent.position)
    }
  }

  return (
    <WheelPickerView
      {...props}
      onChange={onItemSelected}
    />
  )
}

export default WheelPicker