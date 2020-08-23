import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import WheelSelector from '../Minor/WheelSelector'
import TimeSelector from '../Minor/TimeSelector'
import { delay } from '../../Helpers/General'

export const NewBgReading: React.FC = () => {
  const [reading, setReading] = useState(0.0)
  const [dateTime, setDateTime] = useState(null)

  const submitReading = async () => {
    const url = 'http://localhost:8088/readings/bg'
    const data = dateTime ? { reading, created: dateTime } : { reading }

    try {
      if (reading >= 0) {
        if (reading < 1) { delay(500) }
        return fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      }
    } catch (err) {
      console.log('Error submitReading: ', err)
    }
  }

  return(
    <View style={Styles.container}>
      <Text style={Styles.text}>{'New Bg Reading'}</Text>
      <TimeSelector setDateTime={setDateTime} />
      <WheelSelector updateReading={setReading} />
      <TouchableOpacity onPress={async() => await submitReading()} style={Styles.submit}>
        <Text>{'Submit'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%'
  },
  text: {
    fontSize: 20
  },
  submit: {
    padding: 20,
    backgroundColor: '#c4c4c4'
  }
})
