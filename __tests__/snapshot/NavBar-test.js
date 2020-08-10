import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import NavBar from '../../src/Components/NavBar'

it('renders correctly', () => {
  const navBar = renderer.create(<NavBar />)

  expect(navBar).toMatchSnapshot()
})
