import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { decimalPadRight, delay } from '../Helpers/GeneralHelpers'

const getStats = async (days: number) => {
  const url = `http://localhost:8088/readings/bg/stats/${days}`

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

const unit = 'mmol/L'

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
      ? <View style={Styles.statsContainer}>
          <View style={Styles.statsHeader}>
            <Text style={Styles.statsTime}>
              { `Past ${days} days` }
            </Text>
          </View>
          <LinearGradient 
            start={{x: 0.0, y: 1.0}} end={{x: 0.4, y: 1.0}}
            colors={['grey', '#ebebeb']}
            style={{ height: 0.5, width: '100%', alignItems: 'center', justifyContent: 'center'}}
            >
          </LinearGradient>

          <View style={Styles.statsContent}>
            <View>
              <Text style={Styles.statsAvg}>
                { decimalPadRight(avg) }
              </Text>
              <Text style={Styles.statsAvgUnit}>
                { unit }
              </Text>
            </View>
            <Text style={Styles.statsStddev}>
              { `±${decimalPadRight(stddev)}` }
            </Text>
          </View>
          <LinearGradient 
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
            colors={['#ebebeb', 'grey', '#ebebeb']}
            style={{ height: 0.5, width: '100%', alignItems: 'center', justifyContent: 'center'}}
            >
          </LinearGradient>
        </View>
      : <View style={Styles.statsContainer}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 5, justifyContent: 'center' }}>
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
  statsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.2
  },
  statsContent: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%'
  },
  statsText: {
    fontSize: 20
  },
  statsTime: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    width: 104
  },
  statsAvg: {
    fontSize: 54,
    textAlign: 'right'
  },
  statsAvgUnit: {
    fontSize: 12,
    textAlign: 'center'
  },
  statsStddev: {
    fontSize: 32,
    padding: 12,
    paddingLeft: 10,
    paddingBottom: 0
  },
  statsHeader: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start'
  }
})
