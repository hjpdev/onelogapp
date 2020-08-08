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
    return readings
  } catch(err) {
    console.log('Error: ', err)
  }
}

const getStats = (): Promise<any> => {
  const days = [3, 7, 14, 30, 90]
  const tmpArr = [] as any

  for (const day of days) {
    return getReadings(`bg/stats/${day})`).then(res => tmpArr.push({ created: `${day} Day` , ...res }) )
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
        // if (await getData('bgReadings') === null) {
          bgReadings = await getReadings('bg')
          console.log('bgReadings HERE => ', bgReadings)
          // await storeData('bgReadings', JSON.stringify(bgReadings))
        // }
        // if (await getData('bgStats') === null) {
          stats = getStats()
          console.log('stats HERE => ', stats)
          // await storeData('bgStats', JSON.stringify(stats))
        // }
        // if (await getData('doseReadings') === null) {
          doseReadings = getReadings('dose')
          console.log('doseReadings HERE => ', doseReadings)
          // await storeData('doseReadings', JSON.stringify(doseReadings))
          // ))
        // }
        // if (await getData('macroReadings') === null) {
          macroReadings = getReadings('macro')
          console.log('macroReadings HERE => ', macroReadings)
          // await storeData('macroReadings', JSON.stringify(macroReadings))
        // }
        await storeData('bgReadings', JSON.stringify(bgReadings))
        await storeData('bgStats', JSON.stringify(stats))
        await storeData('doseReadings', JSON.stringify(doseReadings))
        await storeData('macroReadings', JSON.stringify(macroReadings))
      } catch(err) {
        console.log('Error: ', err)
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
