import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { DoseTemplateProps } from '../index'

export interface IDoseReading {
  reading: number,
  islong: boolean
}

const generateStyle = (isLong: boolean) => {
  return isLong === true 
    ? { ...Styles.type, backgroundColor: '#c4c4c4' }
    : Styles.type
}


const DoseReading: React.FC<DoseTemplateProps> = (props: DoseTemplateProps) => {
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

        <Text style={generateStyle(islong)}>
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
    paddingTop: 8,
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
    borderRadius: 1,
    color: '#3f3d3d',
    width: '30%'
  }
})

export default DoseReading
