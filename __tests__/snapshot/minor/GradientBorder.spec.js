import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import GradientBorder from '../../../src/Components/Minor/GradientBorder'

it('renders correctly when colors provided', () => {
  const app = renderer.create(<GradientBorder x={1.0} y={1.0} colors={['#ebebeb', 'grey']} />)

  expect(app).toMatchSnapshot()
})

it('renders correctly when colors not provided', () => {
  const app = renderer.create(<GradientBorder x={1.0} y={1.0} />)

  expect(app).toMatchSnapshot()
})
