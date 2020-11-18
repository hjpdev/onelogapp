import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'

import PreviousReadingsHeader from './PreviousReadingsHeader'
import PreviousReadingsForDate from './PreviousReadingsForDate'
import { PreviousBgReading, PreviousDoseReading, PreviousKetoReading, PreviousMacroReading } from './Readings'
import { generateCreatedDay } from '../../Helpers/Date'
import { LocalStore } from '../../Store'
import { getReadings } from '../../Store/Data'

type PreviousReadingsProps = {
  route: {
    params: {
      dataKey: string
      headerText: string
    }
  }
}

type PreviousReading = {
  id: string
  created: Date
  data: number
  Template: React.FC
}

const templateMap: {[key: string]: any} = {
  bgReadings: PreviousBgReading,
  ketoReadings: PreviousKetoReading,
  doseReadings: PreviousDoseReading,
  macroReadings: PreviousMacroReading
}

const PreviousReadings: React.FC<PreviousReadingsProps> = (props: PreviousReadingsProps) => {
  const { route } = props
  const { dataKey, headerText } = route.params
  const store = new LocalStore()

  const [readings, setReadings] = useState([] as any)

  const fetchReadings = async (dataKey: string) => {
    try {
      let { readings } = await store.getData(dataKey)
      if (!readings) {
        const response = await getReadings({ dataKeys: [dataKey] })
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
    const readingsByDay: {[day: string]: PreviousReading[]} = {}
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
    const uniqueDates = dates.filter((item, i, ar) => ar.indexOf(item) === i).sort((a, b) => a - b)
    const readingsByDay = sortReadingsByDay(uniqueDates)

    return uniqueDates.map((date, index) => (index === 0
      ? <PreviousReadingsForDate opened date={date} readings={readingsByDay[date]} key={date} Template={templateMap[dataKey]} update={(dataKey: string) => fetchReadings(dataKey)} />
      : <PreviousReadingsForDate date={date} readings={readingsByDay[date]} key={date} Template={templateMap[dataKey]} update={(dataKey: string) => fetchReadings(dataKey)} />))
  }

  return (
    <>
      <PreviousReadingsHeader headerText={headerText} />
      <ScrollView>
        {generateListItems()}
      </ScrollView>
    </>
  )
}

export default PreviousReadings
