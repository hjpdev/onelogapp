import 'react-native'
import React from 'react'
import { render } from '@testing-library/react-native'

import HomeScreen from '../../../../src/Components/Screens/Home'

jest.mock('../../../../src/Helpers/Data', () => ({ checkHomeScreenData: jest.fn() }))
import { checkHomeScreenData } from '../../../../src/Helpers/Data'

it('renders four Carousels', async () => {
  const { getByTestId, getAllByTestId } = render(<HomeScreen />)

  expect(getByTestId('home-screen')).toBeTruthy()
  expect(getAllByTestId('carousel').length).toEqual(4)
  expect(checkHomeScreenData.mock.calls.length).toEqual(1)
})
