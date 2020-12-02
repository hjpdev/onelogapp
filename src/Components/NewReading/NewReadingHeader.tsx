import React from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { GradientBorder } from '../Minor'

interface NewReadingHeaderProps{
  headerText: string
  dataKey?: string
  hidePreviousReadingsIcon?: boolean
}

export const NewReadingHeader: React.FC<NewReadingHeaderProps> = (props: NewReadingHeaderProps) => {
  const { headerText, dataKey, hidePreviousReadingsIcon } = props

  const navigation = useNavigation()
  const generatePreviousReadingsIconStyle = () =>
    hidePreviousReadingsIcon
      ? { ...Styles.previousReadingsIcon, tintColor: '#ebebeb', opacity: 100 }
      : Styles.previousReadingsIcon

  return (
    <>
      <View style={Styles.header}>
        <View style={Styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../Assets/Images/BackArrow.png')} style={Styles.backIcon} />
          </TouchableOpacity>
        </View>
        <View style={Styles.headerTextContainer}>
          <Text style={Styles.headerText}>{`New ${headerText} Reading`}</Text>
        </View>
        <View style={Styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('PreviousReadings', { dataKey, headerText })}>
            <Image
              source={require('../../Assets/Images/PreviousReadings.png')}
              style={generatePreviousReadingsIconStyle()}
            />
          </TouchableOpacity>
        </View>
      </View>
      <GradientBorder x={1.0} y={1.0} />
    </>
  )
}

const Styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
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
  headerTextContainer: {
    flex: 4
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center'
  }
})
