import AsyncStorage from '@react-native-community/async-storage'

export interface ReadingData {
  created?: Date
  name?: string
  reading?: number
  kcal?: number
  carbs?: number
  sugar?: number
  protein?: number
  fat?: number
  amount?: number
  unit?: string
  isLong?: boolean,
  updated: number
}

export const storeData = async (key: string, data: ReadingData): Promise<void> => {
  try {
    const value = JSON.stringify(data)
    await AsyncStorage.setItem(key, value)
  } catch(err) {
    console.log('Error storeData: ', err)
  }
}

export const getData = async (key: string): Promise<ReadingData> => {
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

    if (data && (Date.now() - lastUpdated) > 3600000) {
      console.log(`${key} updated`)
      return true
    }
  } catch(err) {
    console.log('Error needsUpdating: ', err)
  }

  return false
}
