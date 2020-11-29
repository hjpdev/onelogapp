import React from 'react'
import { Image, Text, View } from 'react-native'

// eslint-disable-next-line no-unused-vars
import { BgReading } from '../../../types'
import { BgCarouselStyles } from './Styles'

interface BgCarouselProps {
  reading: BgReading
}

const BgCarousel: React.FC<BgCarouselProps> = (props: BgCarouselProps) => {
  const { reading } = props
  const { data } = reading

  return (
    <View style={BgCarouselStyles.container} testID="carousel-bg">
      <Text style={BgCarouselStyles.reading}>
        { data.toFixed(1) }
      </Text>
      <Text style={BgCarouselStyles.unit}>
        mmol/L
      </Text>
      <>
        { data < 3.8 && <Image style={BgCarouselStyles.image} source={require('../../../Assets/Images/LastReadingDownArrow.png')} testID="bg-image-low" /> }
        { (data >= 3.8 && data <= 8.0) && <Image style={BgCarouselStyles.image} source={require('../../../Assets/Images/LastReadingTick.png')} testID="bg-image-normal" /> }
        { data > 8.0 && <Image style={BgCarouselStyles.image} source={require('../../../Assets/Images/LastReadingUpArrow.png')} testID="bg-image-high" /> }
      </>
    </View>
  )
}

export default BgCarousel
