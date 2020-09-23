import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import MainHeader from './src/Components/MainHeader'
import TabNavigator from './src/Components/TabNavigator'

const App: React.FC = () => {
  return(
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <MainHeader />
      <TabNavigator />
    </NavigationContainer>
  )
}

export default App
