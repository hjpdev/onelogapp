import React from 'react'
import { Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import GradientBorder from '../../Minor/GradientBorder'
// eslint-disable-next-line no-unused-vars
import { DoseReading } from '../../../types'
import { DoseCarouselStyles } from './Styles'

interface DoseCarouselProps {
  reading: DoseReading
}

const DoseCarousel: React.FC<DoseCarouselProps> = (props: DoseCarouselProps) => {
  const { reading } = props
  const { data, long } = reading

  const generateColors = () => (long ? ['#ebebeb', '#e0d5b7'] : ['#ebebeb', '#b56076'])

  return (
    <View style={DoseCarouselStyles.container} testID="carousel-dose">
      <View style={DoseCarouselStyles.readingContainer}>
        <LinearGradient
          colors={generateColors()}
          start={{ x: 0.5, y: 0.8 }}
          end={{ x: 0.5, y: 0.95 }}
          style={DoseCarouselStyles.colorHighlight}
        >
          <Text style={DoseCarouselStyles.reading}>
            { data.toFixed(1) }
          </Text>
        </LinearGradient>
        <GradientBorder x={1.0} y={1.0} />
        <Text>{long ? 'Long' : 'Short'}</Text>
      </View>
    </View>
  )
}

export default DoseCarousel
