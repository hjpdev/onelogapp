import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { decimalPadRight, padLeft } from '../Helpers/GeneralHelpers'

export const BgLayout: React.FC = ({ lastReading }) => {
    const hours = padLeft(new Date(lastReading.created).getHours())
    const minutes = padLeft(new Date(lastReading.created).getMinutes())
    const created = `${hours}:${minutes}`
    const reading = lastReading.reading

  return(
    <View style={Styles.bgLayoutContainer}>
      <View style={Styles.bgLayoutHeader}>
        <Text style={Styles.bgLayoutTime}>
          { created }
        </Text>
      </View>
      <View style={Styles.bgLayoutContentContainer}>
        <Text style={Styles.bgLayoutReading}>
          { decimalPadRight(reading) }
        </Text>
        <View style={Styles.bgLayoutImageContainer}>
          { reading < 3.8 && <Image style={Styles.bgLayoutImage} source={require('../../Assets/Images/LastReadingDownArrow.png')} /> }
          { (reading >= 3.8 && reading <= 8.0) && <Image style={Styles.bgLayoutImage} source={require('../../Assets/Images/LastReadingTick.png')} /> }
          { reading > 8.0 && <Image style={Styles.bgLayoutImage} source={require('../../Assets/Images/LastReadingUpArrow.png')} /> }
        </View>
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  bgLayoutContainer: {
      borderWidth: 0.5,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    bgLayoutContentContainer: {
      flex: 5,
      width: '80%',
      // borderWidth: 0.5
    },
    bgLayoutImageContainer: {
      flex: 1
    },
    bgLayoutImage: {
      height: 30,
      width: 30,
      alignSelf: 'center'
    },
    bgLayoutReading: {
      flex: 2,
      paddingTop: 12,
      fontSize: 60,
      alignSelf: 'center'
    },
    bgLayoutTime: {
      fontSize: 22,
      alignSelf: 'center'
    },
    bgLayoutHeader: {
      flex: 1,
      borderWidth: 0.5,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }
)
