import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'

import PreviousReadingsHeader from './PreviousReadingsHeader'
import PreviousReadingsForDate from './PreviousReadingsForDate'
import ReadingService from '../../Services/ReadingService'
import { LocalStore } from '../../Store'
import { generateCreatedDay } from '../../Helpers/Date'
import { PreviousBgReading, PreviousDoseReading, PreviousKetoReading, PreviousMacroReading } from './Readings'
import { DataKey, StoredReading } from '../../types'

type PreviousReadingsProps = {
  route: {
    params: {
      dataKey: DataKey
      headerText: string
    }
  }
}

const templateMap: {[key: string]: any} = {
  bgReadings: PreviousBgReading,
  ketoReadings: PreviousKetoReading,
  doseReadings: PreviousDoseReading,
  macroReadings: PreviousMacroReading
}

const readingService = new ReadingService()

const PreviousReadings: React.FC<PreviousReadingsProps> = (props: PreviousReadingsProps) => {
  const store = new LocalStore()
  const { route } = props
  const { dataKey, headerText } = route.params

  const [readings, setReadings] = useState<StoredReading[]>([])

  const fetchReadings = async (dataKey: DataKey) => {
    try {
      let { readings } = await store.getData(dataKey)
      if (!readings) {
        const response = await readingService.getReadings({ dataKeys: [dataKey] })
        readings = response[dataKey]
        await store.storeData(dataKey, readings)
      }
      setReadings(readings)
    } catch (err) {
      console.log('Error PreviousReadings.fetchReadings: ', err)
    }
  }

  useEffect(() => {
    fetchReadings(dataKey)
  }, [])

  const sortReadingsByDay = (uniqueDates: string[]) => {
    const readingsByDay: {[day: string]: StoredReading[]} = {}
    uniqueDates.forEach((uniqueDate) => {
      readingsByDay[uniqueDate] = []
    })
    readings.forEach((reading) => {
      const readingDate = generateCreatedDay(reading.created)
      readingsByDay[readingDate].push(reading)
    })

    return readingsByDay
  }

  const generateListItems = () => {
    const dates = readings.map((reading) => generateCreatedDay(reading.created))
    const uniqueDates = dates.filter((item, i, ar) => ar.indexOf(item) === i).sort((a: any, b: any) => a - b)
    const readingsByDay = sortReadingsByDay(uniqueDates)

    return uniqueDates.map((date, index) => (index === 0
      ? <PreviousReadingsForDate opened date={date} readings={readingsByDay[date]} key={date} Template={templateMap[dataKey]} update={(dataKey: string) => fetchReadings(dataKey)} />
      : <PreviousReadingsForDate date={date} readings={readingsByDay[date]} key={date} Template={templateMap[dataKey]} update={(dataKey: string) => fetchReadings(dataKey)} />))
  }

  return (
    <>
      <PreviousReadingsHeader headerText={headerText} />
      <ScrollView>
        { generateListItems() }
      </ScrollView>
    </>
  )
}

export default PreviousReadings
