import AsyncStorage from '@react-native-community/async-storage'

export const storeData = async (key: string, value: any): Promise<any> => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch(err) {
    console.log('Error: ', err)
  }
}

export const getData = async (key: string): Promise<any> => {
  try {
    const data = await AsyncStorage.getItem(key)
    return data
  } catch(err) {
    console.log('Error: ', err)
  }
}
