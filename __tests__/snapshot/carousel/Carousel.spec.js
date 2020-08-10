import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import Carousel from '../../../src/Components/Carousel'

it('renders correctly', () => {
  const carousel = renderer.create(<Carousel symbol={'>'} handlePress={() => null}/>)

  expect(carousel).toMatchSnapshot()
})
