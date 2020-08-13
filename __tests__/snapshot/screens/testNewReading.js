import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import NewReadingScreen from '../../../src/Components/Screens/NewReading'

it('renders correctly', () => {
  const newReadingScreen = renderer.create(<NewReadingScreen />)

  expect(newReadingScreen).toMatchSnapshot()
})