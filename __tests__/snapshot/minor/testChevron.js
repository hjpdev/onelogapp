import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import Chevron from '../../../src/Components/Minor/Chevron'

it('renders correctly when symbol provided', () => {
  const chevron = renderer.create(<Chevron symbol={'>'} handlePress={() => null}/>)

  expect(chevron).toMatchSnapshot()
})

it('renders correctly when symbol not provided', () => {
  const chevron = renderer.create(<Chevron symbol={''} handlePress={() => null} />)

  expect(chevron).toMatchSnapshot()
})
