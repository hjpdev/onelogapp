import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { StatsTemplateProps } from '../index'

export interface IStatsReading {
  created: string,
  avg: number,
  stddev: number
}

const StatsReading: React.FC<StatsTemplateProps> = (props: StatsTemplateProps) => {
  const { data } = props
  const { avg, stddev } = data

  return(
      <View style={Styles.container}>
        <View style={Styles.readingContainer}>
          <Text style={Styles.reading}>
            { avg.toFixed(1) }
          </Text>
          <Text style={Styles.unit}>
          { 'mmol/L' }
          </Text>
        </View>

        <Text style={Styles.type}>
        { `±${stddev.toFixed(1)}` }
       </Text>
      </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'blue'
  },
  readingContainer: {
    alignItems: 'center',
    width: '50%'
  },
  reading: {
    fontSize: 54,
    color: '#3f3d3d'
  },
  unit: {
    fontSize: 12,
  },
  type: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    // backgroundColor: 'black',
    width: '30%'
  }
})

export default StatsReading
