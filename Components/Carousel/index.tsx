import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures';

import { GradientBorder } from '../Minor/GradientBorder'
import { Chevron } from '../Minor/Chevron'
import { generateCreatedDate } from '../Helpers/DateHelpers'
import { capitalise } from '../Helpers/GeneralHelpers'

interface CarouselProps {
  table: string,
  Template: React.FC
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
  const { table, Template } = props
  const [readings, setReadings] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    getReadings(table).then(res => setReadings(res
      .reverse()
      .sort((a: any, b: any) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime()
      })
    ))
  }, [])

  const handleSwipeLeft = () => {
    if (index < readings.length - 1) setIndex(index + 1)
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
              { capitalise(table) }
            </Text>
            <Text style={Styles.time}>
              { generateCreatedDate(reading['created']) }
            </Text>
          </View>
          <GradientBorder x={0.4} y={1.0} colors={['grey', '#ebebeb']} />

          <View style={Styles.contentContainer}>
            <View style={Styles.chevron}>
            {index === 0
              ? <Chevron symbol={''} handlePress={() => {}}/>
              : <Chevron symbol={'<'} handlePress={handleSwipeRight} />}
            </View>
            <GestureRecognizer onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} style={Styles.template}>
              <Template data={reading} />
            </GestureRecognizer>
            <View style={Styles.chevron}>
            {index < readings.length - 1
              ? <Chevron symbol={'>'} handlePress={handleSwipeLeft} />
              : <Chevron symbol={''} handlePress={() => {}} />}
            </View>
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
    backgroundColor: '#ebebeb'
    // backgroundColor: 'grey'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
},
  template: {
    flex: 4,
    alignContent: 'center'
  },
  chevron: {
    flex: 1
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
