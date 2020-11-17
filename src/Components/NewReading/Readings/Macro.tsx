import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import MacroReadingInput from '../../Minor/MacroReadingInput'
import SavedMacros from '../../SavedMacros/SavedMacros'
import { NewReadingHeader } from '../NewReadingHeader'
import SuccessModal from '../../Modals/SuccessModal'
import TimeSelector from '../../Minor/TimeSelector'
import { handleSuccessfulSubmit, submitReading } from '../../../Store/Data'

type MacroReading = {
  kcal: number,
  carbs: number,
  sugar: number,
  protein: number,
  fat: number,
}

type NewMacroReadingProps = {
  route?: {
    params: {
      macros: MacroReading
    }
  }
}

export const NewMacroReading: React.FC<NewMacroReadingProps> = (props: NewMacroReadingProps) => {
  const { route } = props
  const macros = route && route.params && route.params.macros

  const [data, setData] = useState<{[key: string]: string | number}>(macros || {})
  const [dateTime, setDateTime] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const Stack = createStackNavigator()

  const handleSubmit = async () => {
    if (Object.keys(data).length > 0) {
      if (!Object.keys(data).every((macro) => data[macro] === 0)) {
        try {
          const reading = dateTime ? { ...data, created: dateTime } : { ...data }
          const response = await submitReading({ table: 'macro', data })

          return handleSuccessfulSubmit('macroReadings', response, setShowSuccessModal)
        } catch (err) {
          console.log('Error macro handleSubmit: ', err)
        }
      }
    }
  }

  const newMacroReading = () => (
    <>
      <NewReadingHeader headerText="Macro" dataKey="macroReadings" />
      <View style={Styles.container}>
        <TimeSelector setDateTime={setDateTime} />
        <MacroReadingInput showSavedMacroOptions data={macros} updateReading={setData} />
        <TouchableOpacity onPress={async () => await handleSubmit()} style={Styles.submit}>
          <Text style={Styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )

  const savedMacros = () => (
    <SavedMacros updateReading={setData} />
  )

  return (
    <Stack.Navigator initialRouteName="MacroReading" screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Stack.Screen name="MacroReading" component={newMacroReading} />
      <Stack.Screen name="SavedMacros" component={savedMacros} />
    </Stack.Navigator>
  )
}

export default NewMacroReading

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '92%'
  },
  submit: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 16,
    backgroundColor: '#d6d6d6'
  },
  submitText: {
    fontSize: 18
  },
})
