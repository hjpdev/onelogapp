import 'react-native'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import NavBar from '../../../src/Components/NavBar'

it('renders five nav links', () => {
  const { getByTestId } = render(<NavBar navigation={{ navigate: jest.fn() }} />)

  expect(getByTestId('nav-link-settings')).toBeTruthy()
  expect(getByTestId('nav-link-account')).toBeTruthy()
  expect(getByTestId('nav-link-home')).toBeTruthy()
  expect(getByTestId('nav-link-new-reading')).toBeTruthy()
  expect(getByTestId('nav-link-analytics')).toBeTruthy()
})

it('changes the current screen when nav link is pressed', () => {
  const mockNavigate = jest.fn()
  const { getByTestId } = render(<NavBar navigation={{ navigate: mockNavigate }} />)

  fireEvent.press(getByTestId('nav-link-settings'))

  expect(mockNavigate.mock.calls.length).toBe(1)
  expect(mockNavigate.mock.calls[0][0]).toBe('Settings')

  fireEvent.press(getByTestId('nav-link-account'))

  expect(mockNavigate.mock.calls.length).toBe(2)
  expect(mockNavigate.mock.calls[1][0]).toBe('Account')

  fireEvent.press(getByTestId('nav-link-home'))

  expect(mockNavigate.mock.calls.length).toBe(3)
  expect(mockNavigate.mock.calls[2][0]).toBe('Home')

  fireEvent.press(getByTestId('nav-link-new-reading'))

  expect(mockNavigate.mock.calls.length).toBe(4)
  expect(mockNavigate.mock.calls[3][0]).toBe('NewReading')

  fireEvent.press(getByTestId('nav-link-analytics'))

  expect(mockNavigate.mock.calls.length).toBe(5)
  expect(mockNavigate.mock.calls[4][0]).toBe('Analytics')
})
