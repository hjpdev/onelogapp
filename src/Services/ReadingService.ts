import Config from 'react-native-config'

import { LocalStore } from '../Store'
import { DataKey, Reading, ReadingProps, StoredReading, Table } from '../types'
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

const store = new LocalStore()

export default class ReadingsService {
  async getReadings(options: GetReadingsOptions): Promise<GetReadingsResult> {
    const { dataKeys, days } = options
    if (!dataKeys && !days) {
      throw new Error('Error getReadings: Must provide dataKeys to query (& array of days if relevent).')
    }
    const query = this.generateReadingsQuery({ dataKeys, days })
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

  async submitReading(options: SubmitReadingOptions): Promise<StoredReading> {
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

  async putReading(options: PutReadingOptions) {
    const { table, id, data } = options
    const url = `${BASE_URL}/readings/${table}/${id}`

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
      const entry = await result.json()
      return entry
    } catch (err) {
      console.log('Error putReading: ', err)
    }
  }

  async deleteReading(options: DeleteReadingOptions) {
    const { table, id } = options
    const url = `${BASE_URL}/readings/${table}/${id}`

    try {
      const result = await fetch(url, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      console.log('Made request deleteReading')
      return await result.json()
    } catch (err) {
      console.log('Error deleteReading: ', err)
    }
  }

  async handleSuccessfulSubmit(
    dataKey: string,
    response: { [key: string]: any },
    modalSwitchFunction: (isVisible: boolean) => void
  ): Promise<void> {
    try {
      await store.addReading(dataKey, response)
      modalSwitchFunction(true)
      await delay(1000)
      modalSwitchFunction(false)
    } catch (err) {
      console.log('Error handleSuccessfulSubmit: ', err)
    }
  }

  async handleSuccessfulUpdate(
    dataKey: string,
    updatedReading: any,
    modalSwitchFunction: (isVisible: boolean) => void
  ) {
    try {
      await store.updateReadings(dataKey, updatedReading)
      modalSwitchFunction(true)
      await delay(1000)
      modalSwitchFunction(false)
    } catch (err) {
      console.log('Error handleSuccessfulSubmit: ', err)
    }
  }

  async handleSuccessfulDelete(
    dataKey: string,
    response: { id: number },
    modalSwitchFunction: (isVisible: boolean) => void
  ): Promise<void> {
    const { id } = response
    try {
      await store.removeReading(dataKey, id)
      modalSwitchFunction(true)
      await delay(1000)
      modalSwitchFunction(false)
    } catch (err) {
      console.log('Error handleSuccessfulDelete: ', err)
    }
  }

  async getHomeScreenData(): Promise<any> {
    await this.updateHomeScreenData()
    try {
      const bgReadings = await store.getData(DataKey.bg)
      const bgStats = await store.getData(DataKey.bgStats)
      const doseReadings = await store.getData(DataKey.dose)
      const macroReadings = await store.getData(DataKey.macro)

      return {
        bgReadings,
        bgStats,
        doseReadings,
        macroReadings
      }
    } catch (err) {
      console.log('Error getHomeScreenData: ', err.stack)
    }
  }

  async updateHomeScreenData() {
    const dataKeys: DataKey[] = []
    for (const key of [DataKey.bg, DataKey.bgStats, DataKey.dose, DataKey.macro, DataKey.keto]) {
      if (await store.needsUpdating(key)) {
        dataKeys.push(key)
      }
    }

    if (dataKeys.length > 0) {
      try {
        const data = await this.getReadings({ dataKeys, days: [7, 14, 30, 90, 365] })
        for (const key of Object.keys(data)) {
          await store.storeData(key, data[key])
        }
      } catch (err) {
        console.log('Error getHomeScreenData: ', err.stack)
      }
    }
  }

  generateReadingsQuery(options: GenerateReadingsQueryOptions): string {
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

    for (const key of dataKeys) {
      querys.push(queryMap[key])
    }

    return querys.length > 0 ? `{ ${querys.join(' ')} }` : ''
  }
}
