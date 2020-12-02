import React, { useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import { Chevron, GradientBorder } from '../Minor'
import { capitalise, generateCreatedDate } from '../../Helpers'
import { Reading } from '../../types'
import { CarouselStyles } from './Styles'

interface ReadingCarouselProps {
  reading: Reading
}

interface CarouselProps {
  name: string
  Template: React.FC<ReadingCarouselProps>
  readings: any[]
  startingIndex?: number
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
  const { name, Template, readings, startingIndex } = props
  const [index, setIndex] = useState(startingIndex || 0)

  const handleSwipeLeft = () => {
    if (index < readings.length - 1) setIndex(index + 1)
  }

  const handleSwipeRight = () => {
    if (index > 0) setIndex(index - 1)
  }

  const reading = readings && readings[index]

  return readings && readings.length > 0 ? (
    <View style={CarouselStyles.container} testID="carousel">
      <View style={CarouselStyles.header}>
        <Text style={CarouselStyles.tag}>{capitalise(name)}</Text>
        <Text style={CarouselStyles.time}>{generateCreatedDate(reading.created) || ''}</Text>
      </View>
      <GradientBorder x={0.4} y={1.0} colors={['grey', '#ebebeb']} />

      <View style={CarouselStyles.contentContainer}>
        <View style={CarouselStyles.chevron}>
          {index === 0 ? <Chevron handlePress={() => null} /> : <Chevron left handlePress={handleSwipeRight} />}
        </View>
        <GestureRecognizer onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} style={CarouselStyles.template}>
          <Template reading={reading} />
        </GestureRecognizer>
        <View style={CarouselStyles.chevron}>
          {index < readings.length - 1 ? (
            <Chevron right handlePress={handleSwipeLeft} />
          ) : (
            <Chevron handlePress={() => null} />
          )}
        </View>
      </View>
      <GradientBorder x={1.0} y={1.0} />
    </View>
  ) : (
    <View style={CarouselStyles.placeholder} testID="carousel">
      <View style={CarouselStyles.placeholder} />
      <View style={CarouselStyles.lastReading}>
        <ActivityIndicator color="black" />
      </View>
      <GradientBorder x={1.0} y={1.0} />
    </View>
  )
}

Carousel.defaultProps = {
  startingIndex: 0
}

export default Carousel
