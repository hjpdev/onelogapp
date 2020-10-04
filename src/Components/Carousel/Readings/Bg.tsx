import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export type BgReadingProps = {
  data: {
    reading: number
  }
}

export const BgReading: React.FC<BgReadingProps> = (props: BgReadingProps) => {
  const { data } = props
  const { reading } = data

  return(
    <View style={Styles.container} testID={'carousel-bg'}>
      <Text style={Styles.reading}>
        { reading.toFixed(1) }
      </Text>
      <Text style={Styles.unit}>
        { 'mmol/L' }
      </Text>
      <>
        { reading < 3.8 && <Image style={Styles.image} source={require('../../../Assets/Images/LastReadingDownArrow.png')} testID={'bg-image-low'} /> }
        { (reading >= 3.8 && reading <= 8.0) && <Image style={Styles.image} source={require('../../../Assets/Images/LastReadingTick.png')} testID={'bg-image-normal'}/> }
        { reading > 8.0 && <Image style={Styles.image} source={require('../../../Assets/Images/LastReadingUpArrow.png')} testID={'bg-image-high'} /> }
      </>
    </View>
  )
}


const Styles = StyleSheet.create({
  container: {
    flex: 5,
    paddingBottom: 10,
    backgroundColor: '#ebebeb',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  reading: {
    justifyContent: 'center',
    color: 'black',
    fontSize: 54,
    paddingTop: 8,
  },
  unit: {
    fontSize: 12,
    paddingBottom: 10
  },
  image: {
    height: 30,
    width: 30
  }
})

export default BgReading
