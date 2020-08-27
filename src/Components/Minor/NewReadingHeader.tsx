import React from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import GradientBorder from './GradientBorder'

type NewReadingHeaderProps = {
  text: string,
  hidePreviousReadingsIcon?: boolean,
  onBack: () => void,
  onShowPrevious: () => void
}

const NewReadingHeader: React.FC<NewReadingHeaderProps> = (props: NewReadingHeaderProps) => {
  const { text, hidePreviousReadingsIcon, onBack, onShowPrevious } = props

  const generatePreviousReadingsIconStyle = () => {
    return hidePreviousReadingsIcon
      ? {...Styles.previousReadingsIcon, tintColor: '#ebebeb'}
      : Styles.previousReadingsIcon
  }

  return(
    <>
    <View style={Styles.header}>
      <View style={Styles.iconContainer}>
        <TouchableOpacity onPress={onBack}>
          <Image source={require('../../Assets/Images/BackArrow.png')} style={Styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={Styles.textContainer}>
        <Text style={Styles.text}>{text}</Text>
      </View>
      <View style={Styles.iconContainer}>
        <TouchableOpacity onPress={onShowPrevious}>
          <Image source={require('../../Assets/Images/PreviousReadings.png')} style={generatePreviousReadingsIconStyle()} />
        </TouchableOpacity>
      </View>
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
    padding: 8
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center'
  },
  backIcon: {
    height: 30,
    width: 30
  },
  previousReadingsIcon: {
    height: 40,
    width: 30
  },
  textContainer: {
    flex: 4
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
})
