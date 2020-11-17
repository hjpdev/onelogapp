import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import { MacroReading } from '../../../../../src/Components/Carousel/Readings'

const testReading = {
  kcal: 100,
  carbs: 10.0,
  sugar: 10.0,
  protein: 10.0,
  fat: 10.0
}

it('renders', () => {
  const { getByTestId } = render(<MacroReading reading={testReading} />)

  expect(getByTestId('carousel-macro')).toBeTruthy()
})
