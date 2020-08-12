import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import { DoseReading } from '../../../../src/Components/Carousel/Readings'

const testData = {
  reading: 5.5,
  islong: false
}

it('renders correctly', () => {
  const doseReading = renderer.create(<DoseReading data={testData} />)

  expect(doseReading).toMatchSnapshot()
})
