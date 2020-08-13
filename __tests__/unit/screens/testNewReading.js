import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import NewReadingScreen from '../../../src/Components/Screens/NewReading'

it('renders correctly', () => {
  const { getByTestId } = render(<NewReadingScreen />)

  expect(getByTestId('new-reading-screen')).toBeTruthy()
})
