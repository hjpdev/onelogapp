import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import AccountScreen from '../../../src/Components/Screens/Account'

it('renders correctly', () => {
  const accountScreen = renderer.create(<AccountScreen />)

  expect(accountScreen).toMatchSnapshot()
})
