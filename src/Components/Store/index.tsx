import AsyncStorage from '@react-native-community/async-storage'

export const storeData = async (key: string, data: any): Promise<any> => {
  try {
    const value = JSON.stringify(data)
    await AsyncStorage.setItem(key, value)
  } catch(err) {
    console.log('Error: ', err)
  }
}

export const getData = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value && JSON.parse(value)
  } catch(err) {
    console.log('Error: ', err)
  }
}
