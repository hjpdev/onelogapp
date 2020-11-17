import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'
import { NavigationContext } from "@react-navigation/native"

import HomeScreen from '../../../../src/Components/Screens/Home'

// fake NavigationContext value data
const navContext = {
  isFocused: () => true,
  // addListener returns an unscubscribe function.
  addListener: jest.fn(() => jest.fn())
}

jest.mock('../../../../src/Store/Data', () => ({ getHomeScreenData: jest.fn(() => {
  return {
    bgReadings: [{ created: '2020-08-10T19:54:29.374Z', data: 7.2 }, { created: '2020-08-10T14:54:29.374Z', data: 5.2 }],
    bgStats: [{ created: '2020-08-10T19:54:29.374Z', data: 0.2 }, { created: '2020-08-10T14:54:29.374Z', data: 0.5 }],
    doseReadings: [{ created: '2020-08-10T19:54:29.374Z', data: 2.5, long: false }, { created: '2020-08-10T14:54:29.374Z', data: 15, long: true }],
    macroReadings: [{ created: '2020-08-10T19:54:29.374Z', kcal: 772, carbs: 7.2, sugar: 2.7, protein: 77.2, fat: 17.2 }]
  }
}) }))
import { getHomeScreenData } from '../../../../src/Store/Data'

it('renders four Carousels', async () => {
  const mockNavigate = jest.fn()
  const { getByTestId, getAllByTestId } = render(<NavigationContext.Provider value={navContext}><HomeScreen navigation={{ navigate: mockNavigate }} /></NavigationContext.Provider>)

  expect(getByTestId('home-screen')).toBeTruthy()
  expect(getAllByTestId('carousel').length).toEqual(4)
  expect(getHomeScreenData.mock.calls.length).toEqual(1)
})
