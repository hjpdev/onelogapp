import React from 'react'
import { View } from 'react-native'

import NewCarousel from '../Carousel'
import { Stats } from '../Minor/Stats'
import { ScreenStyles } from '../../Assets/Styles/Screen'

export const HomeScreen: React.FC = () => {
  return(
    <View style={ScreenStyles.containerView}>
      <NewCarousel table={'bg'} />
      <Stats days={7} />
      <NewCarousel table={'bg'} />
      <NewCarousel table={'bg'} />
    </View>
  )
}
