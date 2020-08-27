import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AccountScreen from './src/Components/Screens/Account'
import AnalyticsScreen from './src/Components/Screens/Analytics'
import HomeScreen from './src/Components/Screens/Home'
import NewReadingScreen from './src/Components/Screens/NewReading'
import SettingsScreen from './src/Components/Screens/Settings'

import MainHeader from './src/Components/MainHeader'

const Stack = createStackNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <MainHeader />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewReading" component={NewReadingScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App
