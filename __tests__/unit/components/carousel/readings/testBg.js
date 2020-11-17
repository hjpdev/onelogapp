import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import { BgReading } from '../../../../../src/Components/Carousel/Readings'

it('renders correct image for the provided reading', () => {
  const { getByTestId, rerender } = render(<BgReading reading={{ data: 7.2 }} />)

  expect(getByTestId('carousel-bg')).toBeTruthy()
  expect(getByTestId('bg-image-normal')).toBeTruthy()

  rerender(<BgReading reading={{ data: 2.2 }} />)
  expect(getByTestId('bg-image-low')).toBeTruthy()

  rerender(<BgReading reading={{ data: 12.2 }} />)
  expect(getByTestId('bg-image-high')).toBeTruthy()
})
