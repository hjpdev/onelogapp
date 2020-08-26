import React from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import GradientBorder from './GradientBorder'

type NewReadingHeaderProps = {
  text: string,
  onBack: () => void
}

const NewReadingHeader: React.FC<NewReadingHeaderProps> = (props: NewReadingHeaderProps) => {
  const { text, onBack } = props

  return(
    <>
    <View style={Styles.header}>
      <TouchableOpacity onPress={onBack}><Image source={require('../../Assets/Images/BackArrow.png')} style={{height: 30, width: 30}} /></TouchableOpacity>
      <Text style={Styles.text}>{text}</Text>
      <TouchableOpacity><Image source={require('../../Assets/Images/PreviousReadings.png')} style={{height: 40, width: 30}} /></TouchableOpacity>
    </View>
    <GradientBorder x={1.0} y={1.0} />
    </>
  )
}

export default NewReadingHeader


const Styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8
  },
  text: {
    fontSize: 20
  }
})
