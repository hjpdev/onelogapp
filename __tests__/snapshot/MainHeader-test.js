import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import MainHeader from '../../src/Components/MainHeader'

it('renders correctly', () => {
  const mainHeader = renderer.create(<MainHeader />)

  expect(mainHeader).toMatchSnapshot()
})
