import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import { DoseReading } from '../../../../../src/Components/Carousel/Readings'

const testData = {
  reading: 5.5,
  long: false
}

it('renders correct tag for dose type', () => {
  const { getByTestId, getByText, rerender } = render(<DoseReading data={testData} />)

  expect(getByTestId('carousel-dose')).toBeTruthy()
  expect(getByText('Short')).toBeTruthy()

  rerender(<DoseReading data={{ ...testData, long: true }} />)
  expect(getByText('Long')).toBeTruthy()
})
