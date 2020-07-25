import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { delay } from '../Helpers/GeneralHelpers'

import { BgLayout } from '../Layouts/Bg'
import { DoseLayout } from '../Layouts/Dose'
import { MacroLayout } from '../Layouts/Macro'

const getLastReading = async (table: string) => {
  const url = `http://localhost:8088/readings/${table}/last`

  await delay(3000)

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

const generateLayout = ({ table, lastReading }) => {
  const layoutMap = {
    'bg': <BgLayout lastReading={ lastReading } />,
    'dose': <DoseLayout lastReading={ lastReading } />,
    'macro': <MacroLayout lastReading={ lastReading } />,
    'keto': <BgLayout lastReading={ lastReading } />
  }

  return layoutMap[table]
}

export const LastReading = ({ table }): React.FC => {
  const [lastReading, setLastReading] = useState()

  useEffect(() => {
    getLastReading(table).then(res => setLastReading(res))
  }, [])

  return(
    lastReading
      ? generateLayout({ table, lastReading })
      : <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }} />
          <View style={{ ...Styles.lastReading, justifyContent: 'center' }}>
            <ActivityIndicator color={'black'} />
          </View>
        </View>
        
  )
}

const Styles = StyleSheet.create({
  lastReading: {
    borderWidth: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5
  }
})
