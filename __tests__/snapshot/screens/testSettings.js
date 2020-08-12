import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import SettingsScreen from '../../../src/Components/Screens/Settings'

it('renders correctly', () => {
  const settingsScreen = renderer.create(<SettingsScreen />)

  expect(settingsScreen).toMatchSnapshot()
})
