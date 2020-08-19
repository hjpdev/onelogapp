import React, { ReactElement, useEffect, useState } from 'react'
import { BackHandler, View } from 'react-native'

import { NewReadingSelection, NewBgReading, NewDoseReading, NewMacroReading, NewKetoReading } from '../NewReadings'

import { ScreenStyles } from '../../Assets/Styles/Screen'

const newReadingTypeMap: { [key: string]: ReactElement } = {
  bg: <NewBgReading />,
  dose: <NewDoseReading />,
  macro: <NewMacroReading />,
  keto: <NewKetoReading />
}

const NewReadingScreen: React.FC = () => {
  const [newReadingType, setNewReadingType] = useState('')

  useEffect(() => {
    const backAction = () => {
      setNewReadingType('')
      return true
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return(
    <View style={ScreenStyles.container} testID={'new-reading-screen'}>
      {newReadingType
        ? newReadingTypeMap[newReadingType]
        : <NewReadingSelection setNewReadingType={(newreadingType: string) => setNewReadingType(newreadingType)} />}
    </View>
  )
}

export default NewReadingScreen
