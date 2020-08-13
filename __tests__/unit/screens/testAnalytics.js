import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import AnalyticsScreen from '../../../src/Components/Screens/Analytics'

it('renders correctly', () => {
  const analyticsScreen = renderer.create(<AnalyticsScreen />)

  expect(analyticsScreen).toMatchSnapshot()
})
