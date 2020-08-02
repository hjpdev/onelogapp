import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { decimalPadRight } from '../../Helpers/GeneralHelpers'

interface NewReadingRepresentationProps {
  reading: any,
  unit: string
}

const BgReading: React.FC<NewReadingRepresentationProps> = (props: NewReadingRepresentationProps) => {
  const { reading, unit } = props

  return(
    <View style={Styles.container}>
      <Text style={Styles.reading}>
        { `${decimalPadRight(reading)}` }
      </Text>
      <Text style={Styles.unit}>
        { unit }
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
    paddingBottom: 10,
    paddingLeft: 100,
    paddingRight: 100,
    // backgroundColor: 'grey'
  },
  reading: {
    alignSelf: 'center',
    fontSize: 54,
    paddingTop: 8
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
