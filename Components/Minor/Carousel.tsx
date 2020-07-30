import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'

import { GradientBorder } from './GradientBorder'
import { delay } from '../Helpers/GeneralHelpers'

const getReadings = (table) => {
  const url = `http://localhost:8088/readings/${table}`

  delay(1000)

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

const Carousel: React.FC = props => {
  const { table, Template } = props
  const [readings, setReadings] = useState()

  useEffect(() => {
    getReadings(table).then(res => setReadings(res.reverse()))
  }, [])

  let templates
  if (readings) {
    templates = readings.map(r => {
      return <Template data={r} />
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
