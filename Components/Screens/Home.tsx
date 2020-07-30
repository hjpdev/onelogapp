import React from 'react'
import { View } from 'react-native'

import Carousel from '../Minor/Carousel'
import { LastReading } from '../Minor/LastReading'
import { BgLayout } from '../Layouts/Bg'
import { Stats } from '../Minor/Stats'
import { ScreenStyles } from '../../Assets/Styles/Screen'

export const HomeScreen: React.FC = () => {
  return(
    <View style={ScreenStyles.containerView}>
      <Carousel table={'bg'} Template={BgLayout}/>
      <Stats days={7} />
      <LastReading table={'dose'} />
      <LastReading table={'macro'} />
    </View>
  )
}
