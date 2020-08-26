import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import MacroReadingInput from '../Minor/MacroReadingInput'
import NewReadingHeader from '../Minor/NewReadingHeader'
import TimeSelector from '../Minor/TimeSelector'
import { submitReading } from '../../Helpers/Data'

type NewMacroReadingProps = {
  onBack: () => void
}

export const NewMacroReading: React.FC<NewMacroReadingProps> = (props: NewMacroReadingProps) => {
  const { onBack } = props

  const [reading, setReading] = useState({})
  const [dateTime, setDateTime] = useState(null)

  const handleSubmit = async () => {
    if (Object.keys(reading).length > 0) {
      if (!Object.keys(reading).every(macro => { return reading[macro] === 0 })) {
        const data = dateTime ? { ...reading, created: dateTime } : { ...reading }
        await submitReading('macro', data)
      }
    }
  }

  return(
    <>
    <NewReadingHeader text={'New Macro Reading'} onBack={onBack} />
    <View style={Styles.container}>
      <TimeSelector setDateTime={setDateTime} />
      <MacroReadingInput updateReading={setReading} />
      <TouchableOpacity onPress={async() => await handleSubmit()} style={Styles.submit}>
        <Text style={Styles.submitText}>{'Submit'}</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

export default NewMacroReading


const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '90%'
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
