import React, { useState } from 'react'
import { View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import Carousel from '../Carousel/Carousel'
import ScreenStyles from '../../Assets/Styles/Screen'
import ReadingService from '../../Services/ReadingService'
import { BgCarousel, StatsCarousel, DoseCarousel, MacroCarousel } from '../Carousel/Readings'

const defaultHomeScreenData = {
  bgReadings: { readings: [] },
  bgStats: { readings: [] },
  doseReadings: { readings: [] },
  macroReadings: { readings: [] }
}

const HomeScreen: React.FC = () => {
  const [data, setData] = useState(defaultHomeScreenData)

  const getHomeData = async () => {
    // await clearAllData()
    try {
      const homeScreenData = await ReadingService.getHomeScreenData()
      console.log('THE HOME SCREEN DATA => ', homeScreenData)
      setData(homeScreenData)
    } catch (err) {
      console.log('Error getHomeData: ', err)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getHomeData()
    }, [])
  )

  const { bgReadings, bgStats, doseReadings, macroReadings } = data
  const allReadingsAvailable = bgReadings && bgStats && doseReadings && macroReadings

  return (
    allReadingsAvailable && (
      <View style={ScreenStyles.container} testID="home-screen">
        <Carousel name="bg" Template={BgCarousel} readings={bgReadings.readings} />
        <Carousel name="stats" Template={StatsCarousel} readings={bgStats.readings} />
        <Carousel name="dose" Template={DoseCarousel} readings={doseReadings.readings} />
        <Carousel name="macro" Template={MacroCarousel} readings={macroReadings.readings} />
      </View>
    )
  )
}

export default HomeScreen
