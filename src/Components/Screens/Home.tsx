import React, { useEffect } from 'react'
import { View } from 'react-native'

import Carousel from '../Carousel/Carousel'
import NavBar from '../NavBar'
import { BgReading, StatsReading, DoseReading, MacroReading } from '../Carousel/Readings'
import { checkHomeScreenData } from '../../Store/Data'
import { ScreenStyles } from '../../Assets/Styles/Screen'

type HomeScreenProps = {
  navigation: any
}

const HomeScreen: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
  const { navigation } = props

  useEffect(() => {
    checkHomeScreenData()
  }, [])

  return(
    <>
    <View style={ScreenStyles.container} testID={'home-screen'}>
      <Carousel name={'bg'} Template={BgReading} dataKey={'bgReadings'} />
      <Carousel name={'stats'} Template={StatsReading} dataKey={'bgStats'} />
      <Carousel name={'dose'} Template={DoseReading} dataKey={'doseReadings'} />
      <Carousel name={'macro'} Template={MacroReading} dataKey={'macroReadings'} />
    </View>
    <NavBar navigation={navigation} />
    </>
  )
}

export default HomeScreen
