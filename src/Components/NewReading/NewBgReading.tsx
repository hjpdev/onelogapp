import React, { useState } from 'react'
import { Text, View } from 'react-native'

import WheelSelector from '../Minor/WheelSelector'
import TimeSelector from '../Minor/TimeSelector'

export const NewBgReading: React.FC = () => {
  const [reading, setReading] = useState(0.0)
  const [dateTime, setDateTime] = useState(null)

  console.log('BG DATE TIME => ', dateTime)

  return(
    <View>
      <Text>{'BG'}</Text>
      <Text>{reading}</Text>
      <TimeSelector setDateTime={setDateTime} />
      <WheelSelector updateReading={setReading} />
    </View>
  )
}
