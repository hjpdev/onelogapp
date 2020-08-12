import { statsDateTitleCompare } from './Date'
import { IStatsReading } from '../Carousel/Readings'

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
