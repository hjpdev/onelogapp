import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import Carousel from '../../../src/Components/Carousel'
import { BgReading, StatsReading, DoseReading, MacroReading } from '../../../src/Components/Carousel/Readings'


it('renders correctly for bg reading', () => {
  const carousel = renderer.create(<Carousel name={'bg'} Template={BgReading} dataKey={'bgReadings'} />)

  expect(carousel).toMatchSnapshot()
})

it('renders correctly for bg stats', () => {
  const carousel = renderer.create(<Carousel name={'stats'} Template={StatsReading} dataKey={'bgStats'} />)

  expect(carousel).toMatchSnapshot()
})

it('renders correctly for dose reading', () => {
  const carousel = renderer.create(<Carousel name={'dose'} Template={DoseReading} dataKey={'doseReadings'} />)

  expect(carousel).toMatchSnapshot()
})

it('renders correctly for macro reading', () => {
  const carousel = renderer.create(<Carousel name={'macro'} Template={MacroReading} dataKey={'macroReadings'} />)

  expect(carousel).toMatchSnapshot()
})
