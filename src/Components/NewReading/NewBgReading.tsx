import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import WheelSelector from '../Minor/WheelSelector'
import TimeSelector from '../Minor/TimeSelector'

export const NewBgReading: React.FC = () => {
  const [reading, setReading] = useState(0.0)
  const [dateTime, setDateTime] = useState(null)

  const submitReading = async () => {
    const url = 'http://localhost:8088/readings/bg'
    const data = dateTime ? { reading, created: dateTime } : { reading }

    try {
      if (reading >= 0) {
        const result = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        return result && result.json()
      }
    } catch (err) {
      console.log('Error submitReading: ', err)
    }
  }

  return(
    <View>
      <Text>{'BG'}</Text>
      <Text>{reading}</Text>
      <TimeSelector setDateTime={setDateTime} />
      <WheelSelector updateReading={setReading} />
      <TouchableOpacity onPress={async() => await submitReading()}>
        <Text>{'Submit'}</Text>
      </TouchableOpacity>
    </View>
  )
}
