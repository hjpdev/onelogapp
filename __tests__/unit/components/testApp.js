import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import App from '../../../App'

test('renders the header, container & nav bar', () => {
  const { getByTestId } = render(<App />)

  expect(getByTestId('main-header')).toBeTruthy()
  expect(getByTestId('app-container')).toBeTruthy()
  expect(getByTestId('nav-bar')).toBeTruthy()
})
