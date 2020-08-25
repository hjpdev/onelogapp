import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import MacroReadingInput from '../Minor/MacroReadingInput'
import TimeSelector from '../Minor/TimeSelector'

export const NewMacroReading: React.FC = () => {
  const [reading, setReading] = useState({})
  const [dateTime, setDateTime] = useState(null)

  return(
    <View style={Styles.container}>
      <Text>{'Macro'}</Text>
      <TimeSelector setDateTime={setDateTime} />
      <MacroReadingInput updateReading={setReading} />
    </View>
  )
}

export default NewMacroReading


const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%'
  },
})