import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { decimalPadRight, delay } from '../Helpers/GeneralHelpers'

const getStats = async days => {
  const url = `http://localhost:8088/readings/bg/stats/${days}`

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

export const Stats = ({ days }): React.FC => {
  const [stats, setStats] = useState()

  useEffect(() => {
    getStats(days).then(res => {
      setStats({ stats: res })
    })
  }, [])

  let avg: number, stddev: number

  if (stats) {
    avg = stats.stats.avg.toFixed(1)
    stddev = stats.stats.stddev.toFixed(1)
  }

  return(
    stats
      ? 
      <>
        <View style={Styles.statsContainer}>
          <View style={Styles.statsHeader}>
            <Text style={Styles.statsTime}>
              { `Past ${days} days:` }
            </Text>
          </View>
          <View style={Styles.statsFigures}>
            <Text style={Styles.statsAvg}>
              { decimalPadRight(avg) }
            </Text>
            <Text style={Styles.statsStddev}>
              { `±${decimalPadRight(stddev)}` }
            </Text>
          </View>
        </View>
      </>
      : <View style={Styles.statsContainer}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 5, justifyContent: 'center' }}>
            <ActivityIndicator color={'black'} />
          </View>
        </View>
  )
}

const Styles = StyleSheet.create({
  statsContainer: {
    flex: 1,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsFigures: {
    flex: 5,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderWidth: 0.5
  },
  statsText: {
    fontSize: 20
  },
  statsTime: {
    fontSize: 22,
    textAlignVertical: 'top'
  },
  statsAvg: {
    fontSize: 60,
  },
  statsStddev: {
    fontSize: 40,
    padding: 12,
    paddingLeft: 10,
    paddingBottom: 0,
  },
  statsHeader: {
    flex: 1,
    borderWidth: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
