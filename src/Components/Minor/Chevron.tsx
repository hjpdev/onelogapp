import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { ChevronStyles } from './Styles'

interface ChevronProps {
  handlePress: () => void
  left?: boolean
  right?: boolean
}

export const Chevron: React.FC<ChevronProps> = (props: ChevronProps) => {
  const { left, right, handlePress } = props
  let symbol = ''
  if (left) symbol = '<'
  if (right) symbol = '>'

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <Text style={ChevronStyles.chevronSymbol}>{symbol}</Text>
    </TouchableOpacity>
  )
}
