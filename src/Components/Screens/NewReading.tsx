import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import NavBar from '../NavBar'
import PreviousReadings from '../PreviousReadings'
import { NewReadingSelection, NewBgReading, NewDoseReading, NewMacroReading, NewKetoReading } from '../NewReading'

const Stack = createStackNavigator()
type NewReadingScreenProps = {
  navigation: {
    navigate: (screen: string) => void
  }
}

const NewReadingScreen: React.FC<NewReadingScreenProps> = (props: NewReadingScreenProps) => {
  const { navigation } = props

  return(
    <>
    <Stack.Navigator initialRouteName="NewReadingSelection" screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Stack.Screen name="NewReadingSelection" component={NewReadingSelection} />
      <Stack.Screen name="NewBgReading" component={NewBgReading} />
      <Stack.Screen name="NewDoseReading" component={NewDoseReading} />
      <Stack.Screen name="NewMacroReading" component={NewMacroReading} />
      <Stack.Screen name="NewKetoReading" component={NewKetoReading} />
      <Stack.Screen name="PreviousReadings" component={PreviousReadings} />
    </Stack.Navigator>
    <NavBar navigation={navigation} />
    </>
  )
}

export default NewReadingScreen