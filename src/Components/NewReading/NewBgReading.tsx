import React, { useState } from 'react'
import { Text, View } from 'react-native'

import WheelSelector from '../Minor/WheelSelector'
import TimeSelector from '../Minor/TimeSelector'

export const NewBgReading: React.FC = () => {
  const [reading, setReading] = useState(0.0)

  return(
    <View>
      <Text>{'BG'}</Text>
      <Text>{reading}</Text>
      <TimeSelector />
      <WheelSelector updateReading={setReading}/>
    </View>
  )
}
