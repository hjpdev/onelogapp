import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import HomeScreen from '../../../src/Components/Screens/Settings'

it('renders correctly', () => {
  const homeScreen = renderer.create(<HomeScreen />)

  expect(homeScreen).toMatchSnapshot()
})
