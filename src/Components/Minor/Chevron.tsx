import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

type ChevronProps = {
  left?: boolean,
  right?: boolean,
  handlePress: () => void
}

const Chevron: React.FC<ChevronProps> = (props: ChevronProps) => {
  const { left, right, handlePress } = props
  let symbol = ''
  if (left) symbol = '<'
  if (right) symbol = '>'

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <Text style={Styles.chevronSymbol}>
        { symbol }
      </Text>
    </TouchableOpacity>
  )
}

export default Chevron

const Styles = StyleSheet.create({
  chevronSymbol: {
    fontSize: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
    color: '#c4c4c4'
  }
})
