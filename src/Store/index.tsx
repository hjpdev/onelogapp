import AsyncStorage from '@react-native-community/async-storage'

import { Reading } from '../types'

export interface LocalStoreData {
  readings: Reading[]
  updated: number
}

export class LocalStore {
  static async storeData(key: string, readings: Reading[]): Promise<void> {
    try {
      const value = JSON.stringify({ readings, updated: Date.now() })
      await AsyncStorage.setItem(key, value)
      console.log(`${key} updated`)
    } catch (err) {
      console.log('Error storeData: ', err)
    }
  }

  static async getData(key: string): Promise<LocalStoreData> {
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

  static async deleteData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
      console.log(`Succes, deleted data for ${key}`)
    } catch (err) {
      console.log('Error deleteData: ', err)
    }
  }

  static async addReading(key: string, reading: any): Promise<any> {
    const data = await LocalStore.getData(key)
    const currentReadings = (data && data.readings) || []
    const updatedReadings = [reading, ...currentReadings]

    let response
    try {
      response = LocalStore.storeData(key, updatedReadings)
    } catch (err) {
      return console.log(`Error addReading(${key}, ${reading})`)
    }

    return response
  }

  static async updateReadings(key: string, updatedReading: any): Promise<void> {
    const data = await LocalStore.getData(key)
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

    try {
      await LocalStore.storeData(key, updatedReadings)
    } catch (err) {
      console.log(`Error addReading(${key}, ${updatedReading})`)
    }
  }

  static async removeReading(key: string, id: number): Promise<any> {
    const data = await LocalStore.getData(key)
    if (!data) {
      return
    }
    const currentReadings = (data && data.readings) || []
    if (!currentReadings) {
      return
    }

    const updatedReadings = currentReadings.filter((reading: any) => reading.id !== id)

    try {
      await LocalStore.storeData(key, updatedReadings)
    } catch (err) {
      console.log(`Error removeReading(${key}, ${id})`)
    }
  }

  static async needsUpdating(key: string): Promise<boolean> {
    try {
      const data = await LocalStore.getData(key)

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

  static async clearAllData(): Promise<void> {
    try {
      await LocalStore.deleteData('bgReadings')
      await LocalStore.deleteData('ketoReadings')
      await LocalStore.deleteData('doseReadings')
      await LocalStore.deleteData('macroReadings')
      await LocalStore.deleteData('bgStats')
      await LocalStore.deleteData('savedMacros')
    } catch (err) {
      console.log(`Error clearing data: ${err}`)
    }

    console.log('Cleared all data')
  }
}
