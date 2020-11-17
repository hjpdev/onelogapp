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
  } catch (err) {
    console.log('Error storeData: ', err)
  }
}

export const getData = async (key: string): Promise<StoreData> => {
  let rawData
  try {
    rawData = await AsyncStorage.getItem(key)
  } catch (err) {
    console.log('Error getData: ', err)
  }
  const data = rawData && JSON.parse(rawData)
  const readings = data && data.readings && data.readings.filter(Boolean)

  return { ...data, readings }
}

export const deleteData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key)
    console.log(`Succes, deleted data for ${key}`)
  } catch (err) {
    console.log('Error deleteData: ', err)
  }
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

export const updateReadings = async (key: string, updatedReading: any) => {
  const data = await getData(key)
  if (!data) {
    return
  }
  const currentReadings = (data && data.readings) || []
  if (!currentReadings) {
    return
  }

  const updatedReadings = currentReadings.map((reading: any) => {
    if (reading.id === updatedReading.id) {
      return { ...reading, ...updatedReading }
    }
    return reading
  })
  const updatedData = { updated: Date.now(), readings: updatedReadings }

  try {
    return storeData(key, updatedData)
  } catch (err) {
    console.log(`Error addReading(${key}, ${updatedReading})`)
  }
}

export const removeReading = async (key: string, id: number): Promise<any> => {
  const data = await getData(key)
  if (!data) {
    return
  }
  const currentReadings = (data && data.readings) || []
  if (!currentReadings) {
    return
  }

  const updatedReadings = currentReadings.filter((reading: any) => reading.id !== id)
  const updatedData = { updated: Date.now(), readings: updatedReadings }

  try {
    return storeData(key, updatedData)
  } catch (err) {
    console.log(`Error removeReading(${key}, ${id})`)
  }
}

export const needsUpdating = async (key: string): Promise<boolean> => {
  try {
    const data = await getData(key)

    if (!data || !data.readings) {
      return true
    }

    if (data.readings.some((reading: any) => !!reading)) {
      return true
    }

    const lastUpdated = data && data.updated
    const diff = Date.now() - lastUpdated
    console.log(`${key} last Updated: ${(diff / 60000).toFixed(1)} minutes ago.`)

    if (data && (Date.now() - lastUpdated) > 3600000) {
      return true
    }
  } catch (err) {
    console.log('Error needsUpdating: ', err)
  }

  return false
}
