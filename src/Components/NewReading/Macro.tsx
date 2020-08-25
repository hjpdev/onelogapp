import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import MacroReadingInput from '../Minor/MacroReadingInput'

export const NewMacroReading: React.FC = () => {
  return(
    <View style={Styles.container}>
      <Text>{'Macro'}</Text>
      <MacroReadingInput />
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