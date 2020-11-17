import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export type StatsReadingProps = {
  reading: {
    created: string,
    avg: number,
    stddev: number
  }
}

export const StatsReading: React.FC<StatsReadingProps> = (props: StatsReadingProps) => {
  const { reading } = props
  const { avg, stddev } = reading

  return (
    <View style={Styles.container} testID="carousel-bg-stats">
      <View style={Styles.readingContainer}>
        <Text style={Styles.reading}>
          { avg && avg.toFixed(1) }
        </Text>
        <Text style={Styles.unit}>
          mmol/L
        </Text>
      </View>

      <Text style={Styles.stddev}>
        { `±${stddev && stddev.toFixed(1)}` }
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
  },
  readingContainer: {
    alignItems: 'center',
    width: '50%'
  },
  reading: {
    fontSize: 54,
    color: 'black'
  },
  unit: {
    fontSize: 12,
  },
  stddev: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#c4c4c4',
    width: '30%'
  }
})
