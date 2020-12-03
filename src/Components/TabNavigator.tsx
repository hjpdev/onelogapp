import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AccountScreen from './Screens/Account'
import AnalyticsScreen from './Screens/Analytics'
import HomeScreen from './Screens/Home'
import NewReadingScreen from './Screens/NewReading'
import SettingsScreen from './Screens/Settings'
import Colors from '../Assets/Styles/Colors'

const tabBarOptions = {
  activeTintColor: Colors.tomato,
  inactiveTintColor: Colors.lightGrey1,
  style: { backgroundColor: Colors.black },
  labelStyle: { fontSize: 12 }
}

const TabNavigator: React.FC = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={tabBarOptions}>
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

const getSettingsIcon = (_: tabIconOptions) => (
  <Image
    style={Styles.icon}
    source={require('../Assets/Images/NavBarSettings.png')}
  />
)

const getAccountIcon = (_: tabIconOptions) => (
  <Image
    style={Styles.icon}
    source={require('../Assets/Images/NavBarAccount.png')}
  />
)

const getHomeIcon = (_: tabIconOptions) => (
  <Image
    style={Styles.icon}
    source={require('../Assets/Images/NavBarHome.png')}
  />
)

const getNewReadingIcon = (_: tabIconOptions) => (
  <Image
    style={Styles.icon}
    source={require('../Assets/Images/NavBarNewReading.png')}
  />
)

const getAnalyticsIcon = (_: tabIconOptions) => (
  <Image
    style={Styles.icon}
    source={require('../Assets/Images/NavBarAnalytics.png')}
  />
)

const Styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    tintColor: Colors.lightGrey1
  }
})
