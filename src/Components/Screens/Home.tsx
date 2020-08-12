import React, { useEffect } from 'react'
import { View } from 'react-native'

import { storeData, needsUpdating } from '../../Store/index'
import { BgReading, StatsReading, DoseReading, MacroReading } from '../Carousel/Readings'
import Carousel from '../Carousel'
import { getReadings, getStats } from '../Helpers/Data'
import { ScreenStyles } from '../../Assets/Styles/Screen'

const update = async (name: string) => {
  const isReading = ['bg', 'dose', 'macro'].includes(name)

  const readings = isReading
    ? await getReadings(name)
    : await getStats()

  
return isReading
  ? await storeData(`${name}Readings`, { updated: Date.now(), readings })
  : await storeData('bgStats', { updated: Date.now(), readings })
}

const HomeScreen: React.FC = () => {
  useEffect(() => {
    const checkData = async () => {
      try {
        if (await needsUpdating('bgReadings')) {
          await update('bg')
        }

        if (await needsUpdating('bgStats')) {
          await update('stats')
        }

        if (await needsUpdating('doseReadings')) {
          await update('dose')
        }

        if (await needsUpdating('macroReadings')) {
          await update('macro')
        }
      } catch(err) {
        console.log('Error checkData: ', err)
      }
    }

    checkData()
  }, [])

  return(
    <View style={ScreenStyles.container}>
      <Carousel name={'bg'} Template={BgReading} dataKey={'bgReadings'} />
      <Carousel name={'stats'} Template={StatsReading} dataKey={'bgStats'} />
      <Carousel name={'dose'} Template={DoseReading} dataKey={'doseReadings'} />
      <Carousel name={'macro'} Template={MacroReading} dataKey={'macroReadings'} />
    </View>
  )
}

export default HomeScreen
