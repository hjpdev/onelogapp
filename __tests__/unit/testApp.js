import 'react-native'
import React from 'react'
import { render, waitFor } from '@testing-library/react-native'
import fetchMock from 'jest-fetch-mock'

import App from '../../App'

test('renders the header, container & nav bar', async () => {
  fetchMock.mockResponse(async () => await Promise.resolve(JSON.stringify({})))
  const { getByTestId } = render(<App />)

  expect(await waitFor(() => getByTestId('main-header'))).toBeTruthy()
  expect(await waitFor(() => getByTestId('nav-bar'))).toBeTruthy()
})
