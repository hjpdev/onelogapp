import Config from 'react-native-config'

import { LocalStore } from '../Store'
import { DataKey, Table } from '../types'
import { delay } from '../Helpers'

const { BASE_URL } = Config

type GenerateReadingsQueryOptions = {
  dataKeys: DataKey[]
  days?: number[]
}

type GetReadingsOptions = {
  queryString?: string
  dataKeys?: DataKey[]
  days?: number[]
}

type SubmitReadingOptions = {
  table: Table
  reading: {
    data: number | {[key: string]: number | string}
    created?: Date | undefined | null
  }
}

type PutReadingOptions = {
  table: Table
  id: number
  data: any
}

type DeleteReadingOptions = {
  table: Table
  id: number
}

const store = new LocalStore()

export default class ReadingsService {
  async getReadings(options: GetReadingsOptions): Promise<any> {
    const { queryString, dataKeys, days } = options
    if (!queryString && !dataKeys && !days) {
      throw new Error('Error getReadings: Must provide either query or, dataKeys to query (& array of days if relevent).')
    }
    const query = queryString || this.generateReadingsQuery({ dataKeys, days })
    const url = `${BASE_URL}/graphql`

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
      return data
    } catch (err) {
      console.log('Error getReadings: ', err)
    }
  }

  async submitReading(options: SubmitReadingOptions): Promise<any> {
    const { table, reading } = options
    const url = `${BASE_URL}/readings/${table}`

    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reading)
      })

      console.log('Made request submitReading')
      const entry = await result.json()
      return entry
    } catch (err) {
      console.log('Error submitReading: ', err)
    }
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

  async handleSuccessfulSubmit(dataKey: string, response: {[key: string]: any}, modalSwitchFunction: (isVisible: boolean) => void): Promise<void> {
    try {
      await store.addReading(dataKey, response)
      modalSwitchFunction(true)
      await delay(1000)
      modalSwitchFunction(false)
    } catch (err) {
      console.log('Error handleSuccessfulSubmit: ', err)
    }
  }

  async handleSuccessfulUpdate(dataKey: string, updatedReading: any, modalSwitchFunction: (isVisible: boolean) => void) {
    try {
      await store.updateReadings(dataKey, updatedReading)
      modalSwitchFunction(true)
      await delay(1000)
      modalSwitchFunction(false)
    } catch (err) {
      console.log('Error handleSuccessfulSubmit: ', err)
    }
  }

  async handleSuccessfulDelete(dataKey: string, response: { id: number }, modalSwitchFunction: (isVisible: boolean) => void): Promise<void> {
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
      const bgReadings = await store.getData('bgReadings')
      const bgStats = await store.getData('bgStats')
      const doseReadings = await store.getData('doseReadings')
      const macroReadings = await store.getData('macroReadings')

      return { bgReadings, bgStats, doseReadings, macroReadings }
    } catch (err) {
      console.log('Error getHomeScreenData: ', err.stack)
    }
  }

  async updateHomeScreenData() {
    const dataKeys: string[] = []
    for (const key of ['bgReadings', 'bgStats', 'doseReadings', 'macroReadings', 'ketoReadings']) {
      if (await store.needsUpdating(key)) {
        dataKeys.push(key)
      }
    }

    if (dataKeys.length > 0) {
      try {
        const queryString = this.generateReadingsQuery({ dataKeys, days: [7, 14, 30, 90, 365] })
        const data = await this.getReadings({ queryString })
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
    const queryMap: {[key: string]: string} = {
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
