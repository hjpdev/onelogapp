import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { decimalPadRight, padLeft } from '../Helpers/GeneralHelpers'

export const DoseLayout: React.FC = ({ lastReading }) => {
    const hours = padLeft(new Date(lastReading.created).getHours())
    const minutes = padLeft(new Date(lastReading.created).getMinutes())
    const created = `${hours}:${minutes}`
    const { reading, isLong } = lastReading

  return(
    <View style={Styles.doseLayoutContainer}>
      <View style={Styles.doseLayoutHeader}>
        <Text style={Styles.doseLayoutTag}>
          { 'Dose' }
        </Text>
        <Text style={Styles.doseLayoutTime}>
          { created }
        </Text>
      </View>
      <View style={Styles.doselayoutContent}>
        <Text style={Styles.doseLayoutContentText}>
          { `${decimalPadRight(reading)}` }
        </Text>
        <View style={Styles.doseLayoutContentTypeContainer}>
          <Text style={Styles.doseLayoutContentType}>
            { isLong ? 'Long' : 'Short' }
          </Text>
        </View>
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  doseLayoutContainer: {
    borderWidth: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  doselayoutContent: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 5,
    // borderWidth: 0.5
  },
  doseLayoutContentText: {
    fontSize: 60,
    paddingRight: 12
  },
  doseLayoutTime: {
    fontSize: 22
  },
  doseLayoutTag: {
    fontSize: 22
  },
  doseLayoutContentType: {
    fontSize: 22,
    padding: 12,
    color: 'white'
  },
  doseLayoutContentTypeContainer: {
    backgroundColor: 'black'
  },
  doseLayoutHeader: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})
