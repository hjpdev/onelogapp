import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures';

import BgReading from './Readings/Bg'
import { GradientBorder } from '../Minor/GradientBorder'
import { Chevron } from '../Minor/Chevron'
import { generateCreatedDate } from '../Helpers/DateHelpers'

interface CarouselProps {
  table: string
}

const getReadings = (table: string) => {
  const url = `http://localhost:8088/readings/${table}`

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => err)
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
  const { table } = props
  const [readings, setReadings] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    getReadings(table).then(res => setReadings(res.reverse()))
  }, [])

  const handleSwipeLeft = () => {
    if (index < readings.length) setIndex(index + 1)
  }

  const handleSwipeRight = () => {
    if (index > 0) setIndex(index - 1)
  }

  const reading = readings && readings[index]

  return(
    readings.length > 0
      ? <View style={Styles.container}>
          <View style={Styles.header}>
            <Text style={Styles.tag}>
              { table.toUpperCase() }
            </Text>
            <Text style={Styles.time}>
              { generateCreatedDate(reading['created']) }
            </Text>
          </View>
          <GradientBorder x={0.4} y={1.0} colors={['grey', '#ebebeb']} />

          <View style={{ flexDirection: 'row', flex: 5 }}>
            {index === 0
              ? <Chevron symbol={''} />
              : <Chevron symbol={'<'} />}
            <GestureRecognizer onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} style={{ flex: 5 }}>
              <BgReading reading={reading['reading']} unit={'mmol/L'} />
            </GestureRecognizer>
            {index < readings.length
              ? <Chevron symbol={'>'} />
              : <Chevron symbol={''} />}
          </View>
          <GradientBorder x={1.0} y={1.0} />
        </View>
      : <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }} />
          <View style={{ ...Styles.lastReading }}>
            <ActivityIndicator color={'black'} />
          </View>
          <GradientBorder x={1.0} y={1.0} />
        </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  tag: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    color: 'white',
    backgroundColor: 'black',
    width: 60
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
  },
  lastReading: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Carousel
