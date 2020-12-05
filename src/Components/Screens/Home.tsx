import React, { useState } from 'react'
import { View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import Carousel from '../Carousel/Carousel'
import ScreenStyles from '../../Assets/Styles/Screen'
import ReadingService from '../../Services/ReadingService'
import { BgCarousel, StatsCarousel, DoseCarousel, MacroCarousel } from '../Carousel/Readings'
import { StoredReading } from '../../types'

interface HomeScreenData {
  [dataKey: string]: {
    readings: StoredReading[]
  }
}

const defaultHomeScreenData = {
  bgReadings: { readings: [] },
  bgStats: { readings: [] },
  doseReadings: { readings: [] },
  macroReadings: { readings: [] }
}

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<HomeScreenData>(defaultHomeScreenData)

  const getHomeData = async (): Promise<void> => {
    // await clearAllData()
    let homeScreenData
    try {
      homeScreenData = await ReadingService.getHomeScreenData()
    } catch (err) {
      console.log('Error getHomeData: ', err)
    }
    setData(homeScreenData)
  }

  useFocusEffect(
    React.useCallback(() => {
      getHomeData()
    }, [])
  )

  const { bgReadings, bgStats, doseReadings, macroReadings } = data

  return (
    <View style={ScreenStyles.container} testID="home-screen">
      <Carousel name="bg" Template={BgCarousel} readings={bgReadings.readings} />
      <Carousel name="stats" Template={StatsCarousel} readings={bgStats.readings} />
      <Carousel name="dose" Template={DoseCarousel} readings={doseReadings.readings} />
      <Carousel name="macro" Template={MacroCarousel} readings={macroReadings.readings} />
    </View>
  )
}

export default HomeScreen
