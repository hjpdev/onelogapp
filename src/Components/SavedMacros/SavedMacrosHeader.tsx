import React from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import GradientBorder from '../Minor/GradientBorder'

type SavedMacrosHeaderProps = {
  numberOfEntries: number
  onPress: () => void
}

const SavedMacrosHeader: React.FC<SavedMacrosHeaderProps> = (props: SavedMacrosHeaderProps) => {
  const { numberOfEntries, onPress } = props

  const navigation = useNavigation()

  return(
    <>
    <View style={Styles.header}>
      <View style={Styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../Assets/Images/BackArrow.png')} style={Styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={Styles.textContainer}>
        <Text style={Styles.text}>{`Saved Macros`}</Text>
      </View>
      <View style={Styles.iconContainer}>
        <TouchableOpacity onPress={onPress}>
          <Image source={require('../../Assets/Images/PreviousReadings.png')} style={{ height: 40, width: 30, position: 'absolute' }} />
          <Text style={Styles.numberOfEntries}>{numberOfEntries}</Text>
        </TouchableOpacity>
      </View>
    </View>
    <GradientBorder x={1.0} y={1.0} />
    </>
  )
}

export default SavedMacrosHeader


const Styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
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
  textContainer: {
    flex: 4
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  numberOfEntries: {
    color: 'red',
    textAlign: 'right',
    paddingTop: 6,
    paddingRight: 4,
    fontSize: 10,
    fontWeight: 'bold',
    height: 40,
    width: 30
  }
})
