import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import { BgReading } from '../../../../src/Components/Carousel/Readings'

const testData = {
  reading: 7.2
}

it('renders correctly', () => {
  const bgReading = renderer.create(<BgReading data={testData} />)

  expect(bgReading).toMatchSnapshot()
})
