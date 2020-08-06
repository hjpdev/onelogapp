import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { decimalPadRight } from '../../Helpers/GeneralHelpers'

interface DoseReadingProps {
  data: any
}

const DoseReading: React.FC<DoseReadingProps> = (props: DoseReadingProps) => {
  const { data } = props
  const { reading, islong } = data

  return(
      <View style={Styles.readingContainer}>
        <View>
          <Text style={Styles.reading}>
            { `${decimalPadRight(reading)}` }
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
  readingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  reading: {
    fontSize: 54,
    paddingTop: 8
  },
  unit: {
    fontSize: 12,
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 12,
    backgroundColor: 'black',
    color: 'white',
  }
})

export default DoseReading
