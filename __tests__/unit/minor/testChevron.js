import 'react-native'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import Chevron from '../../../src/Components/Minor/Chevron'

it('calls function passed in props when pressed', () => {
  const mockHandlePress = jest.fn()
  const { getByText } = render(<Chevron symbol={'>'} handlePress={mockHandlePress}/>)

  fireEvent.press(getByText('>'))

  expect(mockHandlePress.mock.calls.length).toBe(1)
})
