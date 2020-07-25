import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { padLeft } from '../Helpers/DateHelpers'

const getLastReading = async () => {
  const url = 'http://localhost:8088/readings/bg/last'

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

export const LastReading = (): React.FC => {
  const [lastReading, setLastReading] = useState()

  useEffect(() => {
    getLastReading().then(res => setLastReading({
      created: res.created,
      reading: res.reading
    }))
}, [])

let created: string, reading: number

if (lastReading) {
  const hours = padLeft(new Date(lastReading.created).getHours())
  const minutes = padLeft(new Date(lastReading.created).getMinutes())
  created = `${hours}:${minutes}`
  reading = lastReading.reading
}

  return(
    lastReading
      ? <View style={Styles.lastReading}>
          <Text style={Styles.lastReadingTime}>
            {created}
          </Text>
          <Text style={Styles.lastReadingReading}>
            {reading}
          </Text>
        </View>
      : <View style={{ ...Styles.lastReading, justifyContent: 'center' }}>
          <ActivityIndicator color={'black'} style={Styles.lastReadingSpinner} />
        </View>
  )
}

const Styles = StyleSheet.create({
  lastReading: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  lastReadingReading: {
    fontSize: 60
  },
  lastReadingTime: {
    fontSize: 38,
    paddingTop: 10
  }
})
