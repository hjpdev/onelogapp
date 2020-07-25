import React from 'react'
import { View } from 'react-native'

import { LastReading } from '../Minor/LastReading'
import { Stats } from '../Minor/Stats'
import { ScreenStyles } from '../../Assets/Styles/Screen'

export const HomeScreen: React.FC = () => {
  return(
    <View style={ScreenStyles.containerView}>
      <LastReading />
      <Stats days={7} />
    </View>
  )
}
