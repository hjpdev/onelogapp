import React from 'react'
import { View } from 'react-native'

import BgReading from '../Carousel/Readings/Bg'
import DoseReading from '../Carousel/Readings/Dose'
import MacroReading from '../Carousel/Readings/Macro'
import NewCarousel from '../Carousel'
import { Stats } from '../Minor/Stats'
import { ScreenStyles } from '../../Assets/Styles/Screen'

export const HomeScreen: React.FC = () => {
  return(
    <View style={ScreenStyles.containerView}>
      <NewCarousel table={'bg'} Template={BgReading} />
      <Stats days={7} />
      <NewCarousel table={'dose'} Template={DoseReading} />
      <NewCarousel table={'macro'} Template={MacroReading} />
    </View>
  )
}
