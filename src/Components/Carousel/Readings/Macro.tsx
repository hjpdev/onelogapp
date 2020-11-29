import React from 'react'
import { Text, View } from 'react-native'

// eslint-disable-next-line no-unused-vars
import { MacroReadingData } from '../../../types'
import { MacroCarouselStyles } from './Styles'

interface MacroCarouselProps {
  reading: MacroReadingData
}

const MacroCarousel: React.FC<MacroCarouselProps> = (props: MacroCarouselProps) => {
  const { reading } = props
  const { kcal, carbs, sugar, protein, fat } = reading

  return (
    <View style={MacroCarouselStyles.container} testID="carousel-macro">
      <View style={MacroCarouselStyles.labels}>
        <Text style={MacroCarouselStyles.label}>Kcal:</Text>
        <Text style={MacroCarouselStyles.label}>Carbs:</Text>
        <Text style={MacroCarouselStyles.label}>Sugar:</Text>
        <Text style={MacroCarouselStyles.label}>Protein:</Text>
        <Text style={MacroCarouselStyles.label}>Fat:</Text>
      </View>

      <View style={MacroCarouselStyles.values}>
        <Text style={MacroCarouselStyles.value}>{ kcal.toFixed(1) }</Text>
        <Text style={MacroCarouselStyles.value}>{ carbs.toFixed(1) }</Text>
        <Text style={MacroCarouselStyles.value}>{ sugar.toFixed(1) }</Text>
        <Text style={MacroCarouselStyles.value}>{ protein.toFixed(1) }</Text>
        <Text style={MacroCarouselStyles.value}>{ fat.toFixed(1) }</Text>
      </View>
    </View>
  )
}

export default MacroCarousel
