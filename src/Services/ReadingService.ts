import Config from 'react-native-config'

import { LocalStore } from '../Store'
import { DataKey, ReadingProps, StoredReading, Table } from '../types'
import { delay } from '../Helpers'

const { BASE_URL } = Config

interface GenerateReadingsQueryOptions {
  dataKeys: DataKey[]
  days?: number[]
}

interface GetReadingsOptions {
  dataKeys: DataKey[]
  days?: number[]
}

interface GetReadingsResult {
  [dataKey: string]: StoredReading[]
}

interface SubmitReadingOptions {
  table: Table
  reading: ReadingProps
}

interface PutReadingOptions {
  table: Table
  id: number
  data: any
}

interface DeleteReadingOptions {
  table: Table
  id: number
}

const generateReadingsQuery = (options: GenerateReadingsQueryOptions): string => {
  const { dataKeys, days } = options
  const queryMap: { [key: string]: string } = {
    bgReadings: 'bgReadings { id, created data }',
    bgStats: `bgStats(days: [${days}]) { created avg stddev }`,
    doseReadings: 'doseReadings { id, created data long }',
    macroReadings: 'macroReadings { id, created kcal carbs sugar protein fat }',
    ketoReadings: 'ketoReadings { id, created data }',
    savedMacros: 'savedMacros { id, created, name, kcal, carbs, sugar, protein, fat, amount, unit, times_added }'
  }
  const querys: string[] = []

  dataKeys.forEach((key) => {
    querys.push(queryMap[key])
  })

  return querys.length > 0 ? `{ ${querys.join(' ')} }` : ''
}

export default class ReadingsService {
  static async getReadings(options: GetReadingsOptions): Promise<GetReadingsResult> {
    const { dataKeys, days } = options
    if (!dataKeys && !days) {
      throw new Error('Error getReadings: Must provide dataKeys to query (& array of days if relevent).')
    }
    const query = generateReadingsQuery({ dataKeys, days })
    const url = `${BASE_URL}/graphql`
    let readings

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      })
      const { data } = await response.json()
      console.log('Made request getReading')
      readings = data
    } catch (err) {
      console.log('Error getReadings: ', err)
    }

    return readings
  }

  static async submitReading(options: SubmitReadingOptions): Promise<StoredReading> {
    const { table, reading } = options
    const url = `${BASE_URL}/readings/${table}`
    let body = {} as any
    let newReading

    body = reading

    if (typeof reading.data === 'object') {
      delete body.data
      body = { ...body, ...reading.data }
    }

    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      console.log('Made request submitReading')
      newReading = await result.json()
    } catch (err) {
      console.log('Error submitReading: ', err)
    }

    return newReading
  }

  static async putReading(options: PutReadingOptions) {
    const { table, id, data } = options
    const url = `${BASE_URL}/readings/${table}/${id}`

    let entry
    try {
      const result = await fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      console.log('Made request putReading')
      entry = await result.json()
    } catch (err) {
      return console.log('Error putReading: ', err)
    }

    return entry
  }

  static async deleteReading(options: DeleteReadingOptions) {
    const { table, id } = options
    const url = `${BASE_URL}/readings/${table}/${id}`

    let response
    try {
      const result = await fetch(url, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      console.log('Made request deleteReading')
      response = await result.json()
    } catch (err) {
      return console.log('Error deleteReading: ', err)
    }

    return response
  }

  static async handleSuccessfulSubmit(
    dataKey: string,
    response: StoredReading,
    modalSwitchFunction: (_: boolean) => void
  ): Promise<void> {
    try {
      await LocalStore.addReading(dataKey, response)
      modalSwitchFunction(true)
      await delay(1000)
      modalSwitchFunction(false)
    } catch (err) {
      console.log('Error handleSuccessfulSubmit: ', err)
    }
  }

  static async handleSuccessfulUpdate(
    dataKey: string,
    updatedReading: any,
    modalSwitchFunction: (_: boolean) => void
  ) {
    try {
      await LocalStore.updateReadings(dataKey, updatedReading)
      modalSwitchFunction(true)
      await delay(1000)
      modalSwitchFunction(false)
    } catch (err) {
      console.log('Error handleSuccessfulSubmit: ', err)
    }
  }

  static async handleSuccessfulDelete(
    dataKey: string,
    response: { id: number },
    modalSwitchFunction: (_: boolean) => void
  ): Promise<void> {
    const { id } = response
    try {
      await LocalStore.removeReading(dataKey, id)
      modalSwitchFunction(true)
      await delay(1000)
      modalSwitchFunction(false)
    } catch (err) {
      console.log('Error handleSuccessfulDelete: ', err)
    }
  }

  static async getHomeScreenData(): Promise<any> {
    await ReadingsService.updateHomeScreenData()
    let homeScreenData = {} as any
    try {
      const bgReadings = await LocalStore.getData(DataKey.bg)
      const bgStats = await LocalStore.getData(DataKey.bgStats)
      const doseReadings = await LocalStore.getData(DataKey.dose)
      const macroReadings = await LocalStore.getData(DataKey.macro)

      homeScreenData = { bgReadings, bgStats, doseReadings, macroReadings }
    } catch (err) {
      return console.log('Error getHomeScreenData: ', err.stack)
    }

    return homeScreenData
  }

  static async updateHomeScreenData() {
    const dataKeys: DataKey[] = []
    const allDataKeys = [DataKey.bg, DataKey.bgStats, DataKey.dose, DataKey.macro, DataKey.keto]
    allDataKeys.forEach(async (key: DataKey) => {
      if (await LocalStore.needsUpdating(key)) {
        dataKeys.push(key)
      }
    })

    if (dataKeys.length > 0) {
      try {
        const data = await ReadingsService.getReadings({ dataKeys, days: [7, 14, 30, 90, 365] })
        Object.keys(data).forEach(async (key: string) => {
          await LocalStore.storeData(key, data[key])
        })
      } catch (err) {
        console.log('Error updateHomeScreenData: ', err.stack)
      }
    }
  }
}
