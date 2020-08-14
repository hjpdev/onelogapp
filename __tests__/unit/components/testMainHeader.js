import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import MainHeader from '../../../src/Components/MainHeader'

it('renders with the correct title', () => {
  const { getByTestId, getByText } = render(<MainHeader />)

  expect(getByTestId('main-header')).toBeTruthy()
  expect(getByText('Onelog')).toBeTruthy()
})
