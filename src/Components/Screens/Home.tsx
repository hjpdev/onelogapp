import React, { useEffect } from 'react'
import { View } from 'react-native'

import { BgReading, StatsReading, DoseReading, MacroReading } from '../Carousel/Readings'
import Carousel from '../Carousel'
import { checkHomeScreenData } from '../../Helpers/Data'
import { ScreenStyles } from '../../Assets/Styles/Screen'

const HomeScreen: React.FC = () => {
  useEffect(() => {
    checkHomeScreenData()
  }, [])

  return(
    <View style={ScreenStyles.container} testID={'home-screen'}>
      <Carousel name={'bg'} Template={BgReading} dataKey={'bgReadings'} />
      <Carousel name={'stats'} Template={StatsReading} dataKey={'bgStats'} />
      <Carousel name={'dose'} Template={DoseReading} dataKey={'doseReadings'} />
      <Carousel name={'macro'} Template={MacroReading} dataKey={'macroReadings'} />
    </View>
  )
}

export default HomeScreen
