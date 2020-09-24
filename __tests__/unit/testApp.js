import 'react-native'
import React from 'react'
import { render, waitFor } from '@testing-library/react-native'
import fetchMock from 'jest-fetch-mock'

import App from '../../App'

test('renders the header', async () => {
  fetchMock.mockResponse(async () => await Promise.resolve(JSON.stringify({})))
  const { getByTestId } = render(<App />)

  expect(await waitFor(() => getByTestId('main-header'))).toBeTruthy()
})
