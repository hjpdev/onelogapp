import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { GradientBorder } from '../Minor'
import { HeaderStyles } from './Styles'

interface PreviousReadingsHeaderProps {
  headerText: string
}

const PreviousReadingsHeader: React.FC<PreviousReadingsHeaderProps> = (props: PreviousReadingsHeaderProps) => {
  const { headerText } = props
  const navigation = useNavigation()

  return (
    <>
      <View style={HeaderStyles.header}>
        <View style={HeaderStyles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../Assets/Images/BackArrow.png')} style={HeaderStyles.backIcon} />
          </TouchableOpacity>
        </View>
        <View style={HeaderStyles.textContainer}>
          <Text style={HeaderStyles.text}>{`Previous ${headerText} Readings`}</Text>
        </View>
        <View style={HeaderStyles.iconContainer}>
          <Text style={HeaderStyles.placeholder}> </Text>
        </View>
      </View>
      <GradientBorder x={1.0} y={1.0} />
    </>
  )
}

export default PreviousReadingsHeader
