import React from 'react'
import { Image, Text, View } from 'react-native'

import { decimalPadRight } from '../Helpers/GeneralHelpers'

import { BgLayoutStyles } from '../../Assets/Styles/Layouts'

const ReadingRepresentation: React.FC = props => {
  const { reading, unit } = props

  return(
    <>
      <Text style={BgLayoutStyles.bgLayoutReading}>
        { `${decimalPadRight(reading)}` }
      </Text>
      <Text style={BgLayoutStyles.bgLayoutUnit}>
        { unit }
      </Text>
    </>
  )
}

export default ReadingRepresentation
