import 'react-native'
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import Carousel from '../../../../src/Components/Carousel/Carousel'
import { BgReading } from '../../../../src/Components/Carousel/Readings'

const testData = [{ created: '2020-08-10T19:54:29.374Z', reading: 7.2 }, { created: '2020-08-10T14:54:29.374Z', reading: 5.2 }]

it('renders for bg reading', async () => {
  const { findByText, getByTestId } = render(<Carousel name={'bg'} Template={BgReading} data={testData} />)

  expect(getByTestId('carousel')).toBeTruthy()
  expect(await findByText('7.2')).toBeTruthy()
})

it('pressing right chevron shows the next reading', async () => {
  const { findByText, getByText } = render(<Carousel name={'bg'} Template={BgReading} data={testData} />)

  fireEvent.press(await findByText('>'))

  expect(getByText('5.2')).toBeTruthy()
})

it('pressing left chevron shows the previous reading', async () => {
  const { findByText, getByText } = render(<Carousel name={'bg'} Template={BgReading} data={testData} startingIndex={1} />)

  fireEvent.press(await findByText('<'))

  expect(getByText('7.2')).toBeTruthy()
})
