import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import Container from '../../src/Components/Container'

it('renders correctly', () => {
  const container = renderer.create(<Container />)

  expect(container).toMatchSnapshot()
})
