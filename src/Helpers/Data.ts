
import { needsUpdating, storeData } from '../Store'

type GenerateReadingsQueryOptions = {
  dataKeys: string[]
  days?: number[]
}

type GetReadingsOptions = {
  queryString?: string
  dataKeys?: string[] | undefined
  days?: number[]
}

type SubmitReadingOptions = {
  table: string
  data: {
    reading: number | {[key: string]: number}
    created?: Date | undefined | null
  }
}

type UpdateOptions = {
  dataKey: string
  days?: number[]
}

export const update = async (options: UpdateOptions): Promise<void> => {
  const { dataKey, days } = options

  const readings = await getReadings({ dataKeys: [dataKey], days })
  await storeData(dataKey, { updated: Date.now(), readings })
}

const generateReadingsQuery = (options: GenerateReadingsQueryOptions): string => {
  const { dataKeys, days } = options
  const queryMap: {[key: string]: string} = {
    bgReadings: 'bgReadings { id, created reading }',
    bgStats: `bgStats(days: [${days}]) { created avg stddev }`,
    doseReadings: 'doseReadings { id, created reading long }',
    macroReadings: 'macroReadings { id, created kcal carbs sugar protein fat }'
  }
  const querys: string[] = []

  for (const key of dataKeys) {
    querys.push(queryMap[key])
  }

  return querys.length > 0 ? `{ ${querys.join(' ')} }` : ''
}

export const getReadings = async(options: GetReadingsOptions): Promise<any> => {
  const { queryString, dataKeys, days } = options
  if (!queryString && !dataKeys && ! days) {
    throw new Error('Error getReadings: Must provide either query or, dataKeys to query (& array of days if relevent).')
  }
  const query = queryString || generateReadingsQuery({ dataKeys, days })
  const url = 'http://localhost:8088/graphql'

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
    console.log('HERE IT IS => ', JSON.stringify(data))
    return data
  } catch (err) {
    console.log('Error getReadings: ', err)
  }
}

export const submitReading = async (options: SubmitReadingOptions): Promise<any> => {
  const { table, data } = options
  const url = `http://localhost:8088/readings/${table}`

  try {
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  } catch (err) {
    console.log('Error submitReading: ', err)
  }
}

export const checkHomeScreenData = async (): Promise<void> => {
  const dataKeys: string[] = []
  for (const key of ['bgReadings', 'bgStats', 'doseReadings', 'macroReadings']) {
    if (await needsUpdating(key)) {
      dataKeys.push(key)
    }
  }

  try {
    const queryString = generateReadingsQuery({ dataKeys, days: [7, 14, 30, 90, 365] })
    if (queryString) {
      const data = await getReadings({ queryString })
      for (const key of Object.keys(data)) {
        await storeData(key, { updated: Date.now(), readings: data[key] })
      }
    }
  } catch (err) {
    console.log('Error checkHomeScreenData: ', err.stack)
  }
}
