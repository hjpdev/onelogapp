import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import AnalyticsScreen from '../../../../src/Components/Screens/Analytics'

it('renders', () => {
  const { getByTestId, getByText } = render(<AnalyticsScreen />)

  expect(getByTestId('analytics-screen')).toBeTruthy()
  expect(getByText('Analytics')).toBeTruthy()
})
