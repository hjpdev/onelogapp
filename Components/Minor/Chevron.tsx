import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface ChevronProps {
  symbol: string,
  handlePress: () => any
}

export const Chevron: React.FC<ChevronProps> = (props: ChevronProps) => {
  const { symbol, handlePress } = props
  
  return(
    <TouchableOpacity onPress={() => handlePress()}>
      <Text style={Styles.chevronSymbol}>
        { symbol }
      </Text>
    </TouchableOpacity>
  )
}

const Styles = StyleSheet.create({
  chevronSymbol: {
    fontSize: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
    color: 'grey'
  }
})
