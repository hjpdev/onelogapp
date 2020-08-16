
import { needsUpdating, storeData } from '../Store'
import { statsDateTitleCompare } from './Date'
import { IStatsReading } from '../Components/Carousel/Readings'

const update = async (name: string) => {
  const isReading = ['bg', 'dose', 'macro'].includes(name)

  const readings = isReading
    ? await getReadings(name)
    : await getStats()

  
  return isReading
    ? await storeData(`${name}Readings`, { updated: Date.now(), readings })
    : await storeData('bgStats', { updated: Date.now(), readings })
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

export const getStats = async (): Promise<IStatsReading[]> => {
  const days = [3, 7, 14, 30, 90]
  const tmpArr: Array<IStatsReading> = []

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
