import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { delay } from '../Helpers/GeneralHelpers'
import { BgLayout } from '../Layouts/Bg'
import { DoseLayout } from '../Layouts/Dose'
import { MacroLayout } from '../Layouts/Macro'

const getPreviousReadings = async (table: string) => {
  const url = `http://localhost:8088/readings/${table}/last`

  await delay(1000)

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

const generateLayout = ({ table, previousReadings }) => {
  const layoutMap = {
    'bg': <BgLayout previousReadings={ previousReadings } />,
    'dose': <DoseLayout previousReadings={ previousReadings } />,
    'macro': <MacroLayout previousReadings={ previousReadings } />,
    'keto': <BgLayout previousReadings={ previousReadings } />
  }

  return layoutMap[table]
}

export const LastReading = ({ table }): React.FC => {
  const [previousReadings, setpreviousReadings] = useState()

  useEffect(() => {
    getPreviousReadings(table).then(res => setpreviousReadings(res))
  }, [])

  return(
    previousReadings
      ? generateLayout({ table, previousReadings })
      : <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }} />
          <View style={{ ...Styles.lastReading, justifyContent: 'center' }}>
            <ActivityIndicator color={'black'} />
          </View>
          <LinearGradient 
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
            colors={['#ebebeb', 'grey', '#ebebeb']}
            style={{ height: 0.5, width: '100%', alignItems: 'center', justifyContent: 'center'}}
            >
          </LinearGradient>
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
