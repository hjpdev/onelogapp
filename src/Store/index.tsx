import AsyncStorage from '@react-native-community/async-storage'

import { Reading } from '../types'

export interface LocalStoreData {
  readings: Reading[]
  updated: number
}

export class LocalStore {
  public async storeData(key: string, readings: Reading[]): Promise<void> {
    try {
      const value = JSON.stringify({ readings, updated: Date.now() })
      await AsyncStorage.setItem(key, value)
      console.log(`${key} updated`)
    } catch (err) {
      console.log('Error storeData: ', err)
    }
  }

  public async getData(key: string): Promise<LocalStoreData> {
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

  public async deleteData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
      console.log(`Succes, deleted data for ${key}`)
    } catch (err) {
      console.log('Error deleteData: ', err)
    }
  }

  public async addReading(key: string, reading: any): Promise<any> {
    const data = await this.getData(key)
    const currentReadings = (data && data.readings) || []
    const updatedReadings = [reading, ...currentReadings]

    try {
      return this.storeData(key, updatedReadings)
    } catch (err) {
      console.log(`Error addReading(${key}, ${reading})`)
    }
  }

  public async updateReadings(key: string, updatedReading: any) {
    const data = await this.getData(key)
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
      return this.storeData(key, updatedReadings)
    } catch (err) {
      console.log(`Error addReading(${key}, ${updatedReading})`)
    }
  }

  public async removeReading(key: string, id: number): Promise<any> {
    const data = await this.getData(key)
    if (!data) {
      return
    }
    const currentReadings = (data && data.readings) || []
    if (!currentReadings) {
      return
    }

    const updatedReadings = currentReadings.filter((reading: any) => reading.id !== id)

    try {
      return this.storeData(key, updatedReadings)
    } catch (err) {
      console.log(`Error removeReading(${key}, ${id})`)
    }
  }

  public async needsUpdating(key: string): Promise<boolean> {
    try {
      const data = await this.getData(key)

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

  public async clearAllData(): Promise<void> {
    try {
      await this.deleteData('bgReadings')
      await this.deleteData('ketoReadings')
      await this.deleteData('doseReadings')
      await this.deleteData('macroReadings')
      await this.deleteData('bgStats')
      await this.deleteData('savedMacros')
    } catch (err) {
      console.log(`Error clearing data: ${err}`)
    }

    console.log('Cleared all data')
  }
}
