
import { needsUpdating, storeData } from '../Store'
import { statsDateTitleCompare } from './Date'
import { StatsReadingProps } from '../Components/Carousel/Readings'

export const update = async (table: string) => {
  const readings = table === 'stats'
    ? await getStats()
    : await getReadings(table)

  return table === 'stats'
    ? await storeData('bgStats', { updated: Date.now(), readings })
    : await storeData(`${table}Readings`, { updated: Date.now(), readings })
}

export const checkHomeScreenData = async (): Promise<void> => {
  try {
    if (await needsUpdating('bgReadings')) {
      await update('bg')
    }
    if (await needsUpdating('bgStats')) {
      await update('stats')
    }
    if (await needsUpdating('doseReadings')) {
      await update('dose')
    }
    if (await needsUpdating('macroReadings')) {
      await update('macro')
    }
    await update('keto')
  } catch(err) {
    console.log('Error checkHomeScreenData: ', err.stack)
  }
}

export const getReadings = async (table: string): Promise<any> => {
  const url = `http://localhost:8088/readings/${table}`
  let readings

  try {
    readings = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  } catch(err) {
    console.log('Error getReadings: ', err)
  }

  return readings && readings.json()
}

export const getStats = async (): Promise<StatsReadingProps[]> => {
  const days = [7, 30, 90, 180, 365]
  const tmpArr: Array<StatsReadingProps> = []

  try {
    for (const day of days) {
    const stats = await getReadings(`bg/stats/${day})`)
    tmpArr.push({ created: `${day} Day` , ...stats })
    }
  } catch(err) {
      console.log('Error getStats: ', err)
  }

  return tmpArr.sort(statsDateTitleCompare)
}

type submitReadingData = {
  reading: number | {[key: string]: number},
  created?: Date | undefined | null
}

export const submitReading = async (table: string, data: submitReadingData): Promise<any> => {
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
