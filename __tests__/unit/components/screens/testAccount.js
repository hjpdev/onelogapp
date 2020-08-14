import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import AccountScreen from '../../../../src/Components/Screens/Account'

it('renders', () => {
  const { getByTestId, getByText } = render(<AccountScreen />)

  expect(getByTestId('account-screen')).toBeTruthy()
  expect(getByText('Account')).toBeTruthy()
})
