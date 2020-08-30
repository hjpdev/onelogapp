import AsyncStorage from '@react-native-community/async-storage'

import { BgReadingProps, StatsReadingProps, DoseReadingProps, MacroReadingProps } from '../Components/Carousel/Readings'

export type StoreData = {
  updated: number,
  readings: BgReadingProps[] | StatsReadingProps[] | DoseReadingProps[] | MacroReadingProps[]
}

export const storeData = async (key: string, data: StoreData | StatsReadingProps): Promise<void> => {
  try {
    const value = JSON.stringify(data)
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

  return true
}
