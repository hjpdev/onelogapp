import React, { ReactElement, useEffect, useState } from 'react'
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import GradientBorder from '../Minor/GradientBorder'
import PreviousReadings from '../PreviousReadings'
import { NewBgReading, NewDoseReading, NewMacroReading, NewKetoReading } from '../NewReading'

import NavBar from '../NavBar'
import { ScreenStyles } from '../../Assets/Styles/Screen'

const NewReadingScreen: React.FC = () => {
  const [newReadingType, setNewReadingType] = useState('')

  const newReadingTypeMap: { [key: string]: ReactElement } = {
    bg: <NewBgReading onBack={() => setNewReadingType('')} onShowPrevious={() => setNewReadingType('previous')} />,
    dose: <NewDoseReading onBack={() => setNewReadingType('')} />,
    macro: <NewMacroReading onBack={() => setNewReadingType('')} />,
    keto: <NewKetoReading onBack={() => setNewReadingType('')} />,
    previous: <PreviousReadings dataKey={'bgReadings'} onBack={() => setNewReadingType('bg')} />
  }

  useEffect(() => {
    const backAction = () => {
      setNewReadingType('')
      return true
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    )

    return () => backHandler.remove()
  }, [])

  return(
    <>
    <View style={ScreenStyles.container} testID={'new-reading-screen'}>
      {newReadingType
        ? newReadingTypeMap[newReadingType]
        : <View style={Styles.newReadings}>
            <GradientBorder x={1.0} y={1.0} />
            <TouchableOpacity onPress={() => setNewReadingType('bg')} style={Styles.newReading}>
              <Text style={Styles.newReadingText}>{'Bg'}</Text>
            </TouchableOpacity>
            <GradientBorder x={1.0} y={1.0} />
      
            <TouchableOpacity onPress={() => setNewReadingType('dose')} style={Styles.newReading}>
              <Text style={Styles.newReadingText}>{'Dose'}</Text>
            </TouchableOpacity>
            <GradientBorder x={1.0} y={1.0} />
      
            <TouchableOpacity onPress={() => setNewReadingType('macro')} style={Styles.newReading}>
              <Text style={Styles.newReadingText}>{'Macro'}</Text>
            </TouchableOpacity>
            <GradientBorder x={1.0} y={1.0} />
      
            <TouchableOpacity onPress={() => setNewReadingType('keto')} style={Styles.newReading}>
              <Text style={Styles.newReadingText}>{'Ketones'}</Text>
            </TouchableOpacity>
            <GradientBorder x={1.0} y={1.0} />
          </View>}
    </View>
    <NavBar />
    </>
  )
}

export default NewReadingScreen


const Styles = StyleSheet.create({
  newReadings: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  newReading: {
    alignItems: 'center',
    width: '100%',
    padding: 40
  },
  newReadingText: {
    fontSize: 22
  }
})
