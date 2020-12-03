import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { GradientBorder } from '../Minor'
import { HeaderStyles } from './Styles'

interface NewReadingHeaderProps{
  headerText: string
  dataKey?: string
  hidePreviousReadingsIcon?: boolean
}

export const NewReadingHeader: React.FC<NewReadingHeaderProps> = (props: NewReadingHeaderProps) => {
  const { headerText, dataKey, hidePreviousReadingsIcon } = props

  const navigation = useNavigation()
  const generatePreviousReadingsIconStyle = () => (hidePreviousReadingsIcon
    ? { ...HeaderStyles.previousReadingsIcon, tintColor: '#ebebeb', opacity: 100 }
    : HeaderStyles.previousReadingsIcon)

  return (
    <>
      <View style={HeaderStyles.header}>
        <View style={HeaderStyles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../Assets/Images/BackArrow.png')} style={HeaderStyles.backIcon} />
          </TouchableOpacity>
        </View>
        <View style={HeaderStyles.headerTextContainer}>
          <Text style={HeaderStyles.headerText}>{`New ${headerText} Reading`}</Text>
        </View>
        <View style={HeaderStyles.iconContainer}>
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

export default NewReadingHeader
