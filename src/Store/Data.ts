import { needsUpdating, storeData, getData } from '.'
import { addReading } from '../Store/index'
import { delay } from '../Helpers'

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
    reading: number | {[key: string]: number | string}
    created?: Date | undefined | null
  }
}

const updateHomeScreenData = async () => {
  const dataKeys: string[] = []
  for (const key of ['bgReadings', 'bgStats', 'doseReadings', 'macroReadings', 'ketoReadings']) {
    if (await needsUpdating(key)) {
      dataKeys.push(key)
    }
  }

  if (dataKeys.length > 0) {
    try {
      const queryString = generateReadingsQuery({ dataKeys, days: [7, 14, 30, 90, 365] })
      const data = await getReadings({ queryString })
      for (const key of Object.keys(data)) {
        await storeData(key, { updated: Date.now(), readings: data[key] })
      }
    } catch (err) {
      console.log('Error getHomeScreenData: ', err.stack)
    }
  }
}

const generateReadingsQuery = (options: GenerateReadingsQueryOptions): string => {
  const { dataKeys, days } = options
  const queryMap: {[key: string]: string} = {
    bgReadings: 'bgReadings { id, created reading }',
    bgStats: `bgStats(days: [${days}]) { created avg stddev }`,
    doseReadings: 'doseReadings { id, created reading long }',
    macroReadings: 'macroReadings { id, created kcal carbs sugar protein fat }',
    ketoReadings: 'ketoReadings { id, created reading }',
    savedMacros: 'savedMacros { id, created, name, kcal, carbs, sugar, protein, fat, amount, unit, times_added }'
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
    return data
  } catch (err) {
    console.log('Error getReadings: ', err)
  }
}

export const submitReading = async (options: SubmitReadingOptions): Promise<any> => {
  const { table, data } = options
  const url = `http://localhost:8088/readings/${table}`

  try {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return result.json()
  } catch (err) {
    console.log('Error submitReading: ', err)
  }
}

export const handleSuccessfulSubmit = async (dataKey: string, response: {[key: string]: any}, modalSwitchFunction: (isVisible: boolean) => void): Promise<void> => {
  try {
    await addReading(dataKey, response)
    modalSwitchFunction(true)
    await delay(1000)
    modalSwitchFunction(false)
  } catch (err) {
    console.log('Error bg handleSuccessfulSubmit: ', err)
  }
}

export const getHomeScreenData = async (): Promise<any> => {
  await updateHomeScreenData()
  try {
    const bgReadings = await getData('bgReadings')
    const bgStats = await getData('bgStats')
    const doseReadings = await getData('doseReadings')
    const macroReadings = await getData('macroReadings')
  
    return  { bgReadings, bgStats, doseReadings, macroReadings }
  } catch (err) {
    console.log('Error getHomeScreenData: ', err.stack)
  }
}
