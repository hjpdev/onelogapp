import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import NewReadingHeader from '../Minor/NewReadingHeader'
import TimeSelector from '../Minor/TimeSelector'
import WheelSelector from '../Minor/WheelSelector'
import { submitReading } from '../../Helpers/Data'
import { delay } from '../../Helpers/General'

type NewKetoReadingProps = {
  onBack: () => void
}

export const NewKetoReading: React.FC<NewKetoReadingProps> = (props: NewKetoReadingProps) => {
  const { onBack } = props

  const [reading, setReading] = useState(0.0)
  const [dateTime, setDateTime] = useState(null)

  const handleSubmit = async () => {
    if (reading === 0) { delay(500) }
    const data = dateTime ? { reading, created: dateTime } : { reading }

    await submitReading('keto', data)
  }

  return(
    <>
    <NewReadingHeader text={'New Ketones Reading'} onBack={onBack} />
    <View style={Styles.container}>
      <TimeSelector setDateTime={setDateTime} />
      <WheelSelector updateReading={setReading} />
      <Text style={Styles.text}>{'mmol/L'}</Text>
      <TouchableOpacity onPress={async () => await handleSubmit()} style={Styles.submit}>
        <Text style={Styles.submitText}>{'Submit'}</Text>
      </TouchableOpacity>
    </View>
    </>
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
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
