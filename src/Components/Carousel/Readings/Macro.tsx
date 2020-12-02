import React from 'react'
import { Text, View } from 'react-native'

// eslint-disable-next-line no-unused-vars
import { MacroReadingData } from '../../../types'
import { MacroStyles } from './Styles'

interface MacroCarouselProps {
  reading: MacroReadingData
}

const MacroCarousel: React.FC<MacroCarouselProps> = (props: MacroCarouselProps) => {
  const { reading } = props
  const { kcal, carbs, sugar, protein, fat } = reading

  return (
    <View style={MacroStyles.container} testID="carousel-macro">
      <View style={MacroStyles.labels}>
        <Text style={MacroStyles.label}>Kcal:</Text>
        <Text style={MacroStyles.label}>Carbs:</Text>
        <Text style={MacroStyles.label}>Sugar:</Text>
        <Text style={MacroStyles.label}>Protein:</Text>
        <Text style={MacroStyles.label}>Fat:</Text>
      </View>

      <View style={MacroStyles.values}>
        <Text style={MacroStyles.value}>{kcal.toFixed(1)}</Text>
        <Text style={MacroStyles.value}>{carbs.toFixed(1)}</Text>
        <Text style={MacroStyles.value}>{sugar.toFixed(1)}</Text>
        <Text style={MacroStyles.value}>{protein.toFixed(1)}</Text>
        <Text style={MacroStyles.value}>{fat.toFixed(1)}</Text>
      </View>
    </View>
  )
}

export default MacroCarousel
