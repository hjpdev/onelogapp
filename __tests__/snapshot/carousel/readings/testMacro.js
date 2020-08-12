import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import { MacroReading } from '../../../../src/Components/Carousel/Readings'

const testData = {
  kcal: 100,
  carbs: 10.0,
  sugar: 10.0,
  protein: 10.0,
  fat: 10.0
}

it('renders correctly', () => {
  const macroReading = renderer.create(<MacroReading data={testData} />)

  expect(macroReading).toMatchSnapshot()
})
