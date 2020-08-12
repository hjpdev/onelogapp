import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import { StatsReading } from '../../../../src/Components/Carousel/Readings'

const testData = {
  avg: 6.2,
  stddev: 1.2
}

it('renders correctly', () => {
  const statsReading = renderer.create(<StatsReading data={testData} />)

  expect(statsReading).toMatchSnapshot()
})
