import 'react-native'

import { storeData, getData, needsUpdating } from '../../../src/Store'

jest.mock('@react-native-community/async-storage', () => ({ setItem: jest.fn(), getItem: jest.fn() }))
import AsyncStorage from '@react-native-community/async-storage'

it('stores data', async () => {
  await storeData('testKey', { test: "value" })

  expect(AsyncStorage.setItem).toBeCalledWith('testKey', JSON.stringify({ test: "value" }))
})

it('gets data', async () => {
  await getData('testKey')

  expect(AsyncStorage.getItem).toBeCalledWith('testKey')
})

it('needsUpdating returns true if no value returned for key', async () => {
  AsyncStorage.getItem.mockImplementation(() => Promise.resolve(null))

  const result = await needsUpdating('testKey')

  expect(result).toEqual(true)
})

it('needsUpdating returns true if value has not been updated in over an hour', async () => {
  const overAnHourAgo = Date.now() - 3600001
  AsyncStorage.getItem.mockImplementation(() => Promise.resolve(JSON.stringify({ updated: overAnHourAgo })))

  const result = await needsUpdating('testKey')

  expect(result).toEqual(true)
})

it('needsUpdating returns false if value has been updated within the hour', async () => {
  const underAnHourAgo = Date.now() - 3500
  AsyncStorage.getItem.mockImplementation(() => Promise.resolve(JSON.stringify({ updated: underAnHourAgo, readings: [] })))

  const result = await needsUpdating('testKey')

  expect(result).toEqual(false)
})
