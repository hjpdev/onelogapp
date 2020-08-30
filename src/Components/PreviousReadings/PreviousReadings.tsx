import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import PreviousReadingsHeader from './PreviousReadingsHeader'
import PreviousReadingsForDate from './PreviousReadingsForDate'
import { PreviousBgReading, PreviousKetoReading } from './Readings'
import { generateCreatedDay } from '../../Helpers/Date'
import { getData } from '../../Store'
import { update } from '../../Store/Data'

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
  reading: number
  Template: React.FC
}

const templateMap: {[key: string]: any} = {
  bgReadings: PreviousBgReading,
  ketoReadings: PreviousKetoReading
}

const PreviousReadings: React.FC<PreviousReadingsProps> = (props: PreviousReadingsProps) => {
  const { route } = props
  const { dataKey, headerText } = route.params

  const [readings, setReadings] = useState([])

  useEffect(() => {
    const fetchReadings = async (dataKey: string) => {
      try {
        let data = await getData(dataKey)
        if (!data) {
          await update({ dataKey })
          data = await getData(dataKey)
        }
        setReadings(data.readings)
      } catch(err) {
        console.log('Error PreviousReadings.fetchReadings: ', err)
      }
    }
    fetchReadings(dataKey)
  }, [])

  const sortReadingsByDay = (uniqueDates: string[]) => {
    const readingsByDay: {[day: string]: PreviousReading[]} = {}
    uniqueDates.forEach(uniqueDate => {
      readingsByDay[uniqueDate] = []
    })
    readings.forEach(reading => {
      const readingDate = generateCreatedDay(reading['created'])
      readingsByDay[readingDate].push(reading)
    })

    return readingsByDay
  }

  const generateListItems = () => {
    const dates = readings.map(reading => {
      return generateCreatedDay(reading['created'])
    })
    const uniqueDates = dates.filter((item, i, ar) => ar.indexOf(item) === i)
    const readingsByDay = sortReadingsByDay(uniqueDates)

    return uniqueDates.map((date, index) => {
      return index === 0
        ? <PreviousReadingsForDate opened date={date} readings={readingsByDay[date]} key={date} Template={templateMap[dataKey]} />
        : <PreviousReadingsForDate date={date} readings={readingsByDay[date]} key={date} Template={templateMap[dataKey]} />
    })
  }

  return(
    <>
    <PreviousReadingsHeader headerText={headerText} />
    <ScrollView style={Styles.container}>
      {generateListItems()}
    </ScrollView>
    </>
  )
}

export default PreviousReadings


const Styles = StyleSheet.create({
  container: {
    height: '92%'
  }
})
