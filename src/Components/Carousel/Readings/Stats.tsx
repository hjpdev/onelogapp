import React from 'react'
import { Text, View } from 'react-native'

import { StatsReading } from '../../../types'
import { StatsStyles } from '../Styles'

export interface StatsCarouselProps {
  reading: StatsReading
}

export const StatsCarousel: React.FC<StatsCarouselProps> = (props: StatsCarouselProps) => {
  const { reading } = props
  const { avg, stddev } = reading

  return (
    <View style={StatsStyles.container} testID="carousel-bg-stats">
      <View style={StatsStyles.readingContainer}>
        <Text style={StatsStyles.reading}>{avg && avg.toFixed(1)}</Text>
        <Text style={StatsStyles.unit}>mmol/L</Text>
      </View>

      <Text style={StatsStyles.stddev}>{`±${stddev && stddev.toFixed(1)}`}</Text>
    </View>
  )
}

export default StatsCarousel
