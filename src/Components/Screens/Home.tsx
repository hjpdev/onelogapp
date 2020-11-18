import React, { useState } from 'react'
import { View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import Carousel from '../Carousel/Carousel'
import { BgReading, StatsReading, DoseReading, MacroReading } from '../Carousel/Readings'
import { getHomeScreenData } from '../../Store/Data'
import ScreenStyles from '../../Assets/Styles/Screen'

const deafultHomeScreenData = {
  bgReadings: { readings: [] },
  bgStats: { readings: [] },
  doseReadings: { readings: [] },
  macroReadings: { readings: [] },
}

const HomeScreen: React.FC = () => {
  const [data, setData] = useState(deafultHomeScreenData)

  const getHomeData = async () => {
    // await clearAllData()
    try {
      const homeScreenData = await getHomeScreenData()
      console.log('THE HONME SCREEN DATA => ', homeScreenData)
      setData(homeScreenData)
    } catch (err) {
      console.log('Error getHomeData: ', err)
    }
  }

  useFocusEffect(React.useCallback(() => {
    getHomeData()
  }, []))

  const { bgReadings, bgStats, doseReadings, macroReadings } = data
  const allReadingsAvailable = bgReadings && bgStats && doseReadings && macroReadings

  return (allReadingsAvailable
    && (
    <View style={ScreenStyles.container} testID="home-screen">
      <Carousel name="bg" Template={BgReading} readings={bgReadings.readings} />
      <Carousel name="stats" Template={StatsReading} readings={bgStats.readings} />
      <Carousel name="dose" Template={DoseReading} readings={doseReadings.readings} />
      <Carousel name="macro" Template={MacroReading} readings={macroReadings.readings} />
    </View>
    )
  )
}

export default HomeScreen
