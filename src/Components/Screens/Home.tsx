import React, { useEffect } from 'react'
import { View } from 'react-native'

import { storeData, needsUpdating } from '../Store/index'
import BgReading from '../Carousel/Readings/Bg'
import DoseReading from '../Carousel/Readings/Dose'
import MacroReading from '../Carousel/Readings/Macro'
import StatsReading from '../Carousel/Readings/Stats'
import Carousel from '../Carousel'
import { getReadings, getStats } from '../Helpers/Data'
import { ScreenStyles } from '../../Assets/Styles/Screen'

const update = async (table: string) => {
  const isReading = ['bg', 'dose', 'macro'].includes(table)

  const readings = isReading
    ? await getReadings(table)
    : await getStats()

  
return isReading
  ? await storeData(`${table}Readings`, { updated: Date.now(), readings })
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
      <Carousel table={'bg'} Template={BgReading} dataKey={'bgReadings'} />
      <Carousel table={'stats'} Template={StatsReading} dataKey={'bgStats'} />
      <Carousel table={'dose'} Template={DoseReading} dataKey={'doseReadings'} />
      <Carousel table={'macro'} Template={MacroReading} dataKey={'macroReadings'} />
    </View>
  )
}

export default HomeScreen
