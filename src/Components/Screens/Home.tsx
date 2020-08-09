import React, { useEffect } from 'react'
import { View } from 'react-native'

import { getData, storeData } from '../Store'
import BgReading from '../Carousel/Readings/Bg'
import DoseReading from '../Carousel/Readings/Dose'
import MacroReading from '../Carousel/Readings/Macro'
import StatsReading from '../Carousel/Readings/Stats'
import Carousel from '../Carousel'
import { ScreenStyles } from '../../Assets/Styles/Screen'

const getReadings = async (table: string) => {
  const url = `http://localhost:8088/readings/${table}`
  try {
    const readings = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return readings.json()
  } catch(err) {
    console.log('Error getReadings: ', err)
  }
}

const getStats = async () => {
  const days = [3, 7, 14, 30, 90]
  const tmpArr = [] as any

  try {
    for (const day of days) {
      await getReadings(`bg/stats/${day})`).then(res => tmpArr.push({ created: `${day} Day` , ...res }) )
    }
  } catch(err) {
    console.log('Error getStats: ', err)
  }

  return tmpArr.sort(compare)
}

const compare = ( a: any, b: any ) => {
  const aNumber = parseInt(a.created.split(' ')[0])
  const bNumber = parseInt(b.created.split(' ')[0])

  if ( aNumber < bNumber ){
    return -1;
  }
  if ( aNumber > bNumber ){
    return 1;
  }
  return 0;
}

export const HomeScreen: React.FC = () => {
  useEffect(() => {
    const checkData = async () => {
      let bgReadings, stats, doseReadings, macroReadings
      try {
        if (await getData('bgReadings') === null) {
          bgReadings = await getReadings('bg')
          await storeData('bgReadings', { updated: Date.now(), readings: bgReadings })
        }
        if (await getData('bgStats') === null) {
          stats = await getStats()
          await storeData('bgStats', { updated: Date.now(), readings: stats })
        }
        if (await getData('doseReadings') === null) {
          doseReadings = await getReadings('dose')
          await storeData('doseReadings', { updated: Date.now(), readings: doseReadings })
        }
        if (await getData('macroReadings') === null) {
          macroReadings = await getReadings('macro')
          await storeData('macroReadings', { updated: Date.now(), readings: macroReadings })
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
