import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import Container from '../../src/Components/Container'

it('renders the correct screen provided in props', () => {
  const { getByTestId, rerender } = render(<Container currentScreen={'home'} />)
  expect(getByTestId('home-screen')).toBeTruthy()

  rerender(<Container currentScreen={'newReading'} />)
  expect(getByTestId('new-reading-screen')).toBeTruthy()

  rerender(<Container currentScreen={'settings'} />)
  expect(getByTestId('settings-screen')).toBeTruthy()
  
  rerender(<Container currentScreen={'account'} />)
  expect(getByTestId('account-screen')).toBeTruthy()
  
  rerender(<Container currentScreen={'analytics'} />)
  expect(getByTestId('analytics-screen')).toBeTruthy()
})
