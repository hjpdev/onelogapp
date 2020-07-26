import React from 'react'
import { Image, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { decimalPadRight, padLeft } from '../Helpers/GeneralHelpers'

import { BgLayoutStyles } from '../../Assets/Styles/Layouts'

const unit = 'mmol/L'

export const BgLayout: React.FC = ({ lastReading }) => {
    const hours = padLeft(new Date(lastReading.created).getHours())
    const minutes = padLeft(new Date(lastReading.created).getMinutes())
    const created = `${hours}:${minutes}`
    const reading = lastReading.reading

  return(
    <View style={BgLayoutStyles.bgLayoutContainer}>
      <View style={BgLayoutStyles.bgLayoutHeader}>
        <Text style={BgLayoutStyles.bgLayoutTag}>
          { 'BG' }
        </Text>
        <Text style={BgLayoutStyles.bgLayoutTime}>
          { created }
        </Text>
      </View>
      <LinearGradient 
        start={{x: 0.0, y: 1.0}} end={{x: 0.4, y: 1.0}}
        colors={['grey', '#ebebeb']}
        style={{ height: 0.5, width: '100%', alignItems: 'center', justifyContent: 'center'}}
        >
      </LinearGradient>

      <View style={BgLayoutStyles.bgLayoutContentContainer}>
        <Text style={BgLayoutStyles.bgLayoutReading}>
          { `${decimalPadRight(reading)}` }
        </Text>
        <Text style={BgLayoutStyles.bgLayoutUnit}>
          { unit }
        </Text>
        <View style={BgLayoutStyles.bgLayoutImageContainer}>
          { reading < 3.8 && <Image style={BgLayoutStyles.bgLayoutImage} source={require('../../Assets/Images/LastReadingDownArrow.png')} /> }
          { (reading >= 3.8 && reading <= 8.0) && <Image style={BgLayoutStyles.bgLayoutImage} source={require('../../Assets/Images/LastReadingTick.png')} /> }
          { reading > 8.0 && <Image style={BgLayoutStyles.bgLayoutImage} source={require('../../Assets/Images/LastReadingUpArrow.png')} /> }
        </View>
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
