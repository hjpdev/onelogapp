import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AccountScreen from './Screens/Account'
import AnalyticsScreen from './Screens/Analytics'
import HomeScreen from './Screens/Home'
import NewReadingScreen from './Screens/NewReading'
import SettingsScreen from './Screens/Settings'

const Tab = createBottomTabNavigator()

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={{ activeTintColor: 'tomato', inactiveTintColor: '#ebebeb', style: { backgroundColor: 'black' } }}>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: getSettingsIcon }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarIcon: getAccountIcon }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: getHomeIcon }} />
      <Tab.Screen name="New Reading" component={NewReadingScreen} options={{ tabBarIcon: getNewReadingIcon }} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} options={{ tabBarIcon: getAnalyticsIcon }} />
    </Tab.Navigator>
  )
}

export default TabNavigator


type tabIconOptions = {
  size: number
  focused: boolean
  color: string
}

const getSettingsIcon = (options: tabIconOptions) => {
  return (
    <Image
      style={Styles.icon}
      source={require(`../../src/Assets/Images/NavBarSettings.png`)}
    />
  )
}

const getAccountIcon = (options: tabIconOptions) => {
  return (
    <Image
      style={Styles.icon}
      source={require(`../../src/Assets/Images/NavBarAccount.png`)}
    />
  )
}

const getHomeIcon = (options: tabIconOptions) => {
  return (
    <Image
      style={Styles.icon}
      source={require(`../../src/Assets/Images/NavBarHome.png`)}
    />
  )
}

const getNewReadingIcon = (options: tabIconOptions) => {
  return (
    <Image
      style={Styles.icon}
      source={require(`../../src/Assets/Images/NavBarNewReading.png`)}
    />
  )
}

const getAnalyticsIcon = (options: tabIconOptions) => {
  return (
    <Image
      style={Styles.icon}
      source={require(`../../src/Assets/Images/NavBarAnalytics.png`)}
    />
  )
}

const Styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    tintColor: '#ebebeb'
  }
})
