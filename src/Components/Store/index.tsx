import AsyncStorage from '@react-native-community/async-storage'

import { IBgReading } from '../Carousel/Readings/Bg';
import { IStatsReading } from '../Carousel/Readings/Stats';
import { IDoseReading } from '../Carousel/Readings/Dose';
import { IMacroReading } from '../Carousel/Readings/Macro';

export interface IStoreData {
  updated: number,
  readings: IBgReading[] | IStatsReading[] | IDoseReading[] | IMacroReading[]
}

export const storeData = async (key: string, data: IStoreData | IStatsReading): Promise<void> => {
  try {
    const value = JSON.stringify(data)
    await AsyncStorage.setItem(key, value)
  } catch(err) {
    console.log('Error storeData: ', err)
  }
}

export const getData = async (key: string): Promise<IStoreData> => {
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
    const lastUpdated = data && data.updated

    const diff = Date.now() - lastUpdated
    console.log(`Last Updated: ${(diff / 60000).toFixed(1)} minutes ago.`)

    if (data && (Date.now() - lastUpdated) > 3600000) {
      console.log(`${key} updated`)
      return true
    }
  } catch(err) {
    console.log('Error needsUpdating: ', err)
  }

  return false
}
