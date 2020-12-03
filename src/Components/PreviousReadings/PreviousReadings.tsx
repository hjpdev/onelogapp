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

const templateMap: { [key: string]: any } = {
  bgReadings: PreviousBgReading,
  ketoReadings: PreviousKetoReading,
  doseReadings: PreviousDoseReading,
  macroReadings: PreviousMacroReading
}

const PreviousReadings: React.FC<PreviousReadingsProps> = (props: PreviousReadingsProps) => {
  const { route } = props
  const { dataKey, headerText } = route.params

  const [previousReadings, setPreviousReadings] = useState([] as StoredReading[])

  const fetchReadings = async (key: DataKey) => {
    try {
      let { readings } = await LocalStore.getData(key)
      if (!readings) {
        const response = await ReadingService.getReadings({ dataKeys: [key] })
        readings = response[key]
        await LocalStore.storeData(key, readings)
      }
      setPreviousReadings(readings)
    } catch (err) {
      console.log('Error PreviousReadings.fetchReadings: ', err)
    }
  }

  useEffect(() => {
    fetchReadings(dataKey)
  }, [])

  const sortReadingsByDay = (uniqueDates: string[]) => {
    const readingsByDay: { [day: string]: StoredReading[] } = {}
    uniqueDates.forEach((uniqueDate) => {
      readingsByDay[uniqueDate] = []
    })
    previousReadings.forEach((reading) => {
      const readingDate = generateCreatedDay(reading.created)
      readingsByDay[readingDate].push(reading)
    })

    return readingsByDay
  }

  const generateListItems = () => {
    const dates = previousReadings.map((reading) => generateCreatedDay(reading.created))
    const uniqueDates = dates.filter((item, i, ar) => ar.indexOf(item) === i).sort((a: any, b: any) => a - b)
    const readingsByDay = sortReadingsByDay(uniqueDates)

    return uniqueDates.map((date, index) => (index === 0 ? (
      <PreviousReadingsForDate
        opened
        date={date}
        readings={readingsByDay[date]}
        key={date}
        Template={templateMap[dataKey]}
        update={(_: DataKey) => fetchReadings(dataKey)}
      />
    ) : (
      <PreviousReadingsForDate
        date={date}
        readings={readingsByDay[date]}
        key={date}
        Template={templateMap[dataKey]}
        update={(_: DataKey) => fetchReadings(dataKey)}
      />
    )))
  }

  return (
    <>
      <PreviousReadingsHeader headerText={headerText} />
      <ScrollView>{generateListItems()}</ScrollView>
    </>
  )
}

export default PreviousReadings
