import fetch from 'node-fetch'
import React, { ReactElement, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'

import { GradientBorder } from './GradientBorder'

interface CarouselProps {
  table: string,
  Template: ReactElement
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
  const [readings, setReadings] = useState()

  useEffect(() => {
    getReadings(table).then(res => setReadings(res.reverse()))
  }, [])

  let templates
  if (readings) {
    templates = readings.map((r, i) => {
      return <Template created={r.created} reading={r.reading} index={i} />
    })
  }

  return(
    readings
      ? <>
        <ScrollView horizontal={true} pagingEnabled={true}>
          { templates }
        </ScrollView>
        <GradientBorder x={1.0} y={1.0} />
        </>
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
  lastReading: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Carousel
