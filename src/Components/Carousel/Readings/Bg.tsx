import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { BgTemplateProps } from '../index'

export interface IBgReading {
  reading: number
}

export const BgReading: React.FC<BgTemplateProps> = (props: BgTemplateProps) => {
  const { data } = props
  const reading = data.reading

  return(
    <View style={Styles.container} testID={'carousel-bg'}>
      <Text style={Styles.reading}>
        { reading.toFixed(1) }
      </Text>
      <Text style={Styles.unit}>
        { 'mmol/L' }
      </Text>
      <>
        { reading < 3.8 && <Image style={Styles.image} source={require('../../../Assets/Images/LastReadingDownArrow.png')} /> }
        { (reading >= 3.8 && reading <= 8.0) && <Image style={Styles.image} source={require('../../../Assets/Images/LastReadingTick.png')} /> }
        { reading > 8.0 && <Image style={Styles.image} source={require('../../../Assets/Images/LastReadingUpArrow.png')} /> }
      </>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 5,
    paddingBottom: 10,
    backgroundColor: '#ebebeb',
    width: '100%'
  },
  reading: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: 54,
    paddingTop: 8,
  },
  unit: {
    alignSelf: 'center',
    fontSize: 12,
    paddingBottom: 10
  },
  image: {
    alignSelf: 'center',
    height: 30,
    width: 30
  }
})

export default BgReading
