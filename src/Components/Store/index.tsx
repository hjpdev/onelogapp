import AsyncStorage from '@react-native-community/async-storage'

export const storeData = async (key: string, data: any): Promise<any> => {
  try {
    const value = JSON.stringify(data)
    await AsyncStorage.setItem(key, value)
  } catch(err) {
    console.log('Error storeData: ', err)
  }
}

export const getData = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value && JSON.parse(value)
  } catch(err) {
    console.log('Error getData: ', err)
  }
}

export const needsUpdating = async (key: string): Promise<boolean> => {
  try {
    const data = await getData(key)
    const lastUpdated = data && data.updated

    if (data === null || (Date.now() - lastUpdated) > 3600000) {
      console.log(`${key} updated`)
      return true
    }
  } catch(err) {
    console.log('Error needsUpdating: ', err)
  }

  return false
}
