import React from 'react'
import { Text } from 'react-native'

import { decimalPadRight } from '../Helpers/GeneralHelpers'

import { BgLayoutStyles } from '../../Assets/Styles/Layouts'

interface ReadingRepresentationProps {
  reading: number,
  unit: string
}

const ReadingRepresentation: React.FC<ReadingRepresentationProps> = (props: ReadingRepresentationProps) => {
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
