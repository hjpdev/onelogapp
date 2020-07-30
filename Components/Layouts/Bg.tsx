import React from 'react'
import {  Image, Text, View } from 'react-native'

import ReadingRepresentation from '../Minor/ReadingRepresentation'
import { Chevron } from '../Minor/Chevron'
import { GradientBorder } from '../Minor/GradientBorder'
import { generateCreatedDate } from '../Helpers/DateHelpers'

import { BgLayoutStyles } from '../../Assets/Styles/Layouts'

interface BgLayoutProps {
  created: string,
  reading: number
}

const unit = 'mmol/L'

export const BgLayout: React.FC<BgLayoutProps> = (props: BgLayoutProps) => {
  const { created, reading } = props
  const date = generateCreatedDate(created)

  return(
    <View style={BgLayoutStyles.bgLayoutContainer}>
      <View style={BgLayoutStyles.bgLayoutHeader}>
        <Text style={BgLayoutStyles.bgLayoutTag}>
          { 'BG' }
        </Text>
        <Text style={BgLayoutStyles.bgLayoutTime}>
          { date }
        </Text>
      </View>
      <GradientBorder x={0.4} y={1.0} />

      <View style={BgLayoutStyles.bgLayoutContent}>
        <Chevron symbol={' '} />
        <View style={BgLayoutStyles.bgLayoutContentReading}>
          <ReadingRepresentation reading={reading} unit={unit} />
          <View style={BgLayoutStyles.bgLayoutImageContainer}>
            { reading < 3.8 && <Image style={BgLayoutStyles.bgLayoutImage} source={require('../../Assets/Images/LastReadingDownArrow.png')} /> }
            { (reading >= 3.8 && reading <= 8.0) && <Image style={BgLayoutStyles.bgLayoutImage} source={require('../../Assets/Images/LastReadingTick.png')} /> }
            { reading > 8.0 && <Image style={BgLayoutStyles.bgLayoutImage} source={require('../../Assets/Images/LastReadingUpArrow.png')} /> }
          </View>
        </View>
        <Chevron symbol={' '} />
      </View>
    </View>
  )
}
