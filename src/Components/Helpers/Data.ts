import { statsDateTitleCompare } from './Date'

export const getReadings = async (table: string) => {
  const url = `http://localhost:8088/readings/${table}`
  try {
    const readings = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    return readings.json()
  } catch(err) {
    console.log('Error getReadings: ', err)
  }
}

export const getStats = async () => {
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
