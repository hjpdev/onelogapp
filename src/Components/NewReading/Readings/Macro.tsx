import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import ReadingService from '../../../Services/ReadingService'
import SavedMacros from '../../SavedMacros/SavedMacros'
import SuccessModal from '../../Modals/SuccessModal'
import { MacroReadingInput, TimeSelector } from '../../Minor'
import { NewReadingHeader } from '../NewReadingHeader'
import { DataKey, MacroReadingData, NewReadingHeaderText, Table } from '../../../types'
import { MacroStyles } from '../Styles'

interface NewMacroReadingProps {
  route?: {
    params: {
      macros: MacroReadingData
    }
  }
}

const dataKey = DataKey.macro

export const NewMacroReading: React.FC<NewMacroReadingProps> = (props: NewMacroReadingProps) => {
  const { route } = props
  const macros = route && route.params && route.params.macros

  const [data, setData] = useState(macros || ({} as MacroReadingData))
  const [dateTime, setDateTime] = useState<Date | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const Stack = createStackNavigator()

  const handleSubmit = async () => {
    let response
    if (Object.keys(data).length > 0) {
      if (!Object.keys(data).every((macro) => data[macro] === 0)) {
        try {
          const reading: MacroReadingData = dateTime ? { ...data, created: dateTime } : { ...data }
          response = await ReadingService.submitReading({ table: Table.macro, reading })
        } catch (err) {
          console.log('Error macro handleSubmit: ', err)
        }
      }
    }
    return response && ReadingService.handleSuccessfulSubmit(dataKey, response, setShowSuccessModal)
  }

  const newMacroReading = () => (
    <>
      <NewReadingHeader headerText={NewReadingHeaderText.macro} dataKey={dataKey} />
      <View style={MacroStyles.container}>
        <TimeSelector setDateTime={setDateTime} />
        <MacroReadingInput showSavedMacroOptions reading={macros} updateReading={setData} />
        <TouchableOpacity onPress={async () => handleSubmit()} style={MacroStyles.submit}>
          <Text style={MacroStyles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal isVisible={showSuccessModal} onPress={() => setShowSuccessModal(false)} />
    </>
  )

  const savedMacros = () => <SavedMacros updateReading={setData} />

  return (
    <Stack.Navigator initialRouteName="MacroReading" screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Stack.Screen name="MacroReading" component={newMacroReading} />
      <Stack.Screen name="SavedMacros" component={savedMacros} />
    </Stack.Navigator>
  )
}

export default NewMacroReading
