import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ChevronProps {
  symbol: string
}

export const Chevron: React.FC <ChevronProps> = (props: ChevronProps) => {
  const { symbol } = props
  
  return(
    <View style={Styles.chevronContainer}>
      <Text style={Styles.chevronSymbol}>
        { symbol }
      </Text>
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
