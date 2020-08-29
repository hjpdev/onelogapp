import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import NewReadingScreen from '../../../../src/Components/Screens/NewReading'

const mockNavigate = jest.fn()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  }
})

xit('renders correctly', () => {
  const { getByTestId } = render(<NewReadingScreen />)

  expect(getByTestId('new-reading-screen')).toBeTruthy()
})
