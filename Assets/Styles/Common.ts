import { Dimensions, StyleSheet } from 'react-native'

export const CommonStyles = StyleSheet.create({
  dimensions: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
