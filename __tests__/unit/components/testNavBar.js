import 'react-native'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import NavBar from '../../../src/Components/NavBar'

it('renders five nav links', () => {
  const { getByTestId } = render(<NavBar />)

  expect(getByTestId('nav-link-settings')).toBeTruthy()
  expect(getByTestId('nav-link-account')).toBeTruthy()
  expect(getByTestId('nav-link-home')).toBeTruthy()
  expect(getByTestId('nav-link-new-reading')).toBeTruthy()
  expect(getByTestId('nav-link-analytics')).toBeTruthy()
})

it('changes the current screen when nav link is pressed', () => {
  const mockSetCurrentScreen = jest.fn()
  const { getByTestId } = render(<NavBar setCurrentScreen={mockSetCurrentScreen} />)

  fireEvent.press(getByTestId('nav-link-settings'))

  expect(mockSetCurrentScreen.mock.calls.length).toBe(1)
  expect(mockSetCurrentScreen.mock.calls[0][0]).toBe('settings')

  fireEvent.press(getByTestId('nav-link-account'))

  expect(mockSetCurrentScreen.mock.calls.length).toBe(2)
  expect(mockSetCurrentScreen.mock.calls[1][0]).toBe('account')

  fireEvent.press(getByTestId('nav-link-home'))

  expect(mockSetCurrentScreen.mock.calls.length).toBe(3)
  expect(mockSetCurrentScreen.mock.calls[2][0]).toBe('home')

  fireEvent.press(getByTestId('nav-link-new-reading'))

  expect(mockSetCurrentScreen.mock.calls.length).toBe(4)
  expect(mockSetCurrentScreen.mock.calls[3][0]).toBe('newReading')

  fireEvent.press(getByTestId('nav-link-analytics'))

  expect(mockSetCurrentScreen.mock.calls.length).toBe(5)
  expect(mockSetCurrentScreen.mock.calls[4][0]).toBe('analytics')
})
