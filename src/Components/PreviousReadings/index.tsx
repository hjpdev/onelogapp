import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import PreviousReadingsForDate from './PreviousReadingsForDate'
import NewReadingHeader from '../Minor/NewReadingHeader'
import { getData } from '../../Store'

type PreviousReadingsProps = {
  dataKey: string,
  onBack: () => void
}

const PreviousReadings: React.FC<PreviousReadingsProps> = (props: PreviousReadingsProps) => {
  const { dataKey, onBack } = props

  const [readings, setReadings] = useState([])

  useEffect(() => {
    const fetchReadings = async (key: string) => {
      try {
        const data = await getData(key)
        if (data && data.readings) {
          setReadings(data.readings)
        }
      } catch(err) {
        console.log('Error fetchReadings: ', err)
      }
    }
    fetchReadings(dataKey)
  }, [])

  const generateListItems = () => {
    const dates = readings.map(reading => {
      const date =  new Date(reading.created)
      return `${date.getDate()}/${date.getMonth() + 1}`
    })
    const uniqueDates = dates.filter((item, i, ar) => ar.indexOf(item) === i)
    const readingsByDay: {[day: string]: any[]} = {}
    uniqueDates.forEach(uniqueDate => {
      readingsByDay[uniqueDate] = []
    })

    readings.forEach(reading => {
      const readingDate =  new Date(reading.created)
      const formattedReadingDate = `${readingDate.getDate()}/${readingDate.getMonth() + 1}`

      readingsByDay[formattedReadingDate].push(reading)
    })

    return uniqueDates.map(date => {
      return <PreviousReadingsForDate date={date} readings={readingsByDay[date]} key={date} />
    })
  }

  return(
    <>
    <NewReadingHeader text={'Previous Bg Readings'} hidePreviousIcon onBack={onBack} onShowPrevious={() => null} />
    <View style={Styles.container}>
      {generateListItems()}
    </View>
    </>
  )
}

export default PreviousReadings


const Styles = StyleSheet.create({
  container: {
    height: '92%'
  }
})
