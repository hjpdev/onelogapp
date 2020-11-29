import React, { useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import Chevron from '../Minor/Chevron'
import GradientBorder from '../Minor/GradientBorder'
import { capitalise, generateCreatedDate } from '../../Helpers'
import { BgCarousel, DoseCarousel, MacroCarousel, StatsCarousel } from './Readings'
import Styles from './Styles'

type CarouselProps = {
  name: string
  Template: typeof BgCarousel | typeof DoseCarousel | typeof MacroCarousel | typeof StatsCarousel
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

  return (
    readings && readings.length > 0
      ? (
        <View style={Styles.container} testID="carousel">
          <View style={Styles.header}>
            <Text style={Styles.tag}>
              { capitalise(name) }
            </Text>
            <Text style={Styles.time}>
              {generateCreatedDate(reading.created) || ''}
            </Text>
          </View>
          <GradientBorder x={0.4} y={1.0} colors={['grey', '#ebebeb']} />

          <View style={Styles.contentContainer}>
            <View style={Styles.chevron}>
              {index === 0
                ? <Chevron handlePress={() => null} />
                : <Chevron left handlePress={handleSwipeRight} />}
            </View>
            <GestureRecognizer
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              style={Styles.template}
            >
              <Template reading={reading} />
            </GestureRecognizer>
            <View style={Styles.chevron}>
              {index < readings.length - 1
                ? <Chevron right handlePress={handleSwipeLeft} />
                : <Chevron handlePress={() => null} />}
            </View>
          </View>
          <GradientBorder x={1.0} y={1.0} />
        </View>
      )
      : (
        <View style={Styles.placeholder} testID="carousel">
          <View style={Styles.placeholder} />
          <View style={Styles.lastReading}>
            <ActivityIndicator color="black" />
          </View>
          <GradientBorder x={1.0} y={1.0} />
        </View>
      )
  )
}

Carousel.defaultProps = {
  startingIndex: 0
}

export default Carousel
