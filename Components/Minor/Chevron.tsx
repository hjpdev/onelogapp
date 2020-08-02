import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ChevronProps {
  symbol: string,
  handlePress: () => any
}

export const Chevron: React.FC<ChevronProps> = (props: ChevronProps) => {
  const { symbol, handlePress } = props
  
  return(
    <View style={Styles.chevronContainer}>
      <TouchableOpacity onPress={() => handlePress()}>
        <Text style={Styles.chevronSymbol}>
          { symbol }
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const Styles = StyleSheet.create({
  chevronContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chevronSymbol: {
    fontSize: 28
  }
})
