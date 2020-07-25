import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { decimalPadRight } from '../Helpers/GeneralHelpers'

const getStats = async days => {
  const url = `http://localhost:8088/readings/bg/stats/${days}`

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
        <View style={Styles.stats}>
          <Text style={Styles.statsText}>
            { `Past ${days} days:` }
          </Text>
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
      : <View style={Styles.stats}>
          <ActivityIndicator color={'black'} style={Styles.statsSpinner} />
        </View>
  )
}

const Styles = StyleSheet.create({
  stats: {
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  statsFigures: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 20
  },
  statsAvg: {
    fontSize: 60,
  },
  statsStddev: {
    fontSize: 40,
    padding: 12,
    paddingLeft: 0,
    paddingBottom: 0,
  }
})
