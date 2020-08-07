import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface DoseReadingProps {
  data: any
}

const DoseReading: React.FC<DoseReadingProps> = (props: DoseReadingProps) => {
  const { data } = props
  const { reading, islong } = data

  return(
      <View style={Styles.container}>
        <View style={Styles.readingContainer}>
          <Text style={Styles.reading}>
            { reading.toFixed(1) }
          </Text>
          <Text style={Styles.unit}>
          { 'Units' }
          </Text>
        </View>

        <Text style={Styles.type}>
        { islong === true ? 'Long' : 'Short' }
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
    paddingTop: 8
  },
  unit: {
    fontSize: 12,
  },
  type: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
    backgroundColor: 'black',
    color: 'white',
    width: '30%'
  }
})

export default DoseReading
