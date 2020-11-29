import React from 'react'
import { Text, View } from 'react-native'

import { StatsCarouselStyles } from './Styles'

export interface StatsReadingProps {
  reading: {
    created: string,
    avg: number,
    stddev: number
  }
}

const StatsCarousel: React.FC<StatsReadingProps> = (props: StatsReadingProps) => {
  const { reading } = props
  const { avg, stddev } = reading

  return (
    <View style={StatsCarouselStyles.container} testID="carousel-bg-stats">
      <View style={StatsCarouselStyles.readingContainer}>
        <Text style={StatsCarouselStyles.reading}>
          { avg && avg.toFixed(1) }
        </Text>
        <Text style={StatsCarouselStyles.unit}>
          mmol/L
        </Text>
      </View>

      <Text style={StatsCarouselStyles.stddev}>
        { `±${stddev && stddev.toFixed(1)}` }
      </Text>
    </View>
  )
}

export default StatsCarousel
