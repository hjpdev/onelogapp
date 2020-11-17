import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import { StatsReading } from '../../../../../src/Components/Carousel/Readings'

const testReading = {
  avg: 6.2,
  stddev: 1.2
}

it('renders correctly', () => {
  const { getByTestId } = render(<StatsReading reading={testReading} />)

  expect(getByTestId('carousel-bg-stats')).toBeTruthy()
})
