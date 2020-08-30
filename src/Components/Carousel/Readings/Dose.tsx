import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export type DoseReadingProps = {
  data: {
    reading: number,
    long: boolean
  }
}

const generateStyle = (long: boolean) => {
  return long === true 
    ? { ...Styles.type, backgroundColor: '#c4c4c4' }
    : Styles.type
}


export const DoseReading: React.FC<DoseReadingProps> = (props: DoseReadingProps) => {
  const { data } = props
  const { reading, long } = data

  return(
    <View style={Styles.container} testID={'carousel-dose'}>
      <View style={Styles.readingContainer}>
        <Text style={Styles.reading}>
          { reading.toFixed(1) }
        </Text>
        <Text style={Styles.unit}>
        { 'Units' }
        </Text>
      </View>

      <Text style={generateStyle(long)}>
      { long === true ? 'Long' : 'Short' }
      </Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  readingContainer: {
    alignItems: 'center',
    width: '50%'
  },
  reading: {
    fontSize: 54,
    paddingTop: 8,
    color: 'black'
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
    borderRadius: 1,
    color: '#3f3d3d',
    width: '30%'
  }
})
