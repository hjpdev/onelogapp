import AsyncStorage from '@react-native-community/async-storage'

import { BgReadingProps, StatsReadingProps, DoseReadingProps, MacroReadingProps } from '../Components/Carousel/Readings'

export type StoreData = {
  updated: number,
  readings: BgReadingProps[] | StatsReadingProps[] | DoseReadingProps[] | MacroReadingProps[]
}

export const storeData = async (key: string, data: StoreData | StatsReadingProps | any): Promise<void> => {
  try {
    const value = JSON.stringify({ ...data, updated: Date.now() })
    await AsyncStorage.setItem(key, value)
    console.log(`${key} updated`)
  } catch(err) {
    console.log('Error storeData: ', err)
  }
}

export const getData = async (key: string): Promise<StoreData> => {
  let value
  try {
    value = await AsyncStorage.getItem(key)
  } catch(err) {
    console.log('Error getData: ', err)
  }
  return value && JSON.parse(value)
}

export const addReading = async (key: string, reading: any): Promise<any> => {
  const data = await getData(key)
  const currentReadings = (data && data.readings) || []
  const updatedData = { updated: Date.now(), readings: [reading, ...currentReadings] }

  try {
    return storeData(key, updatedData)
  } catch (err) {
    console.log(`Error addReading(${key}, ${reading})`)
  }
}

export const deleteData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key)
    console.log(`Succes, deleted data for ${key}`)
  } catch (err) {
    console.log('Error deleteData: ', err)
  }
}

export const needsUpdating = async (key: string): Promise<boolean> => {
  try {
    const data = await getData(key)

    if (!data || !data.readings) {
      return true
    }

    const lastUpdated = data && data.updated
    const diff = Date.now() - lastUpdated
    console.log(`${key} last Updated: ${(diff / 60000).toFixed(1)} minutes ago.`)

    if (data && (Date.now() - lastUpdated) > 3600000) {
      return true
    }
  } catch(err) {
    console.log('Error needsUpdating: ', err)
  }

  return false
}
