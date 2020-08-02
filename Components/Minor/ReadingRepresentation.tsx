import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { decimalPadRight } from '../Helpers/GeneralHelpers'

import { CommonStyles } from '../../Assets/Styles/Common'
import { BgLayoutStyles } from '../../Assets/Styles/Layouts'

interface ReadingRepresentationProps {
  reading: number,
  unit: string
}

const ReadingRepresentation: React.FC<ReadingRepresentationProps> = (props: ReadingRepresentationProps) => {
  const { reading, unit } = props

  return(
    <View style={Styles.readingRepresenatation}>
      <Text style={BgLayoutStyles.bgLayoutReading}>
        { `${decimalPadRight(reading)}` }
      </Text>
      <Text style={BgLayoutStyles.bgLayoutUnit}>
        { unit }
      </Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  readingRepresenatation: {
    width: CommonStyles.dimensions.width
  }
})

export default ReadingRepresentation
