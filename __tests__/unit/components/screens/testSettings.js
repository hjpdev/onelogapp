import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import SettingsScreen from '../../../../src/Components/Screens/Settings'

it('renders', () => {
  const { getByTestId, getByText } = render(<SettingsScreen />)

  expect(getByTestId('settings-screen')).toBeTruthy()
  expect(getByText('Settings')).toBeTruthy()
})
