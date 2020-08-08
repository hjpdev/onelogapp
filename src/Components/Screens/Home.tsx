import React, { useState, useEffect } from 'react'
import { asy View } from 'react-native'

import BgReading from '../Carousel/Readings/Bg'
import DoseReading from '../Carousel/Readings/Dose'
import MacroReading from '../Carousel/Readings/Macro'
import StatsReading from '../Carousel/Readings/Stats'
import Carousel from '../Carousel'
import { ScreenStyles } from '../../Assets/Styles/Screen'

const getReadings = (table: string) => {
  const url = `http://localhost:8088/readings/${table}`

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => err)
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
  const [bgReadings, setBgReadings] = useState([])
  const [bgStats, setBgStats] = useState([])
  const [doseReadings, setDoseReadings] = useState([])
  const [macroReadings, setMacroReadings] = useState([])

  useEffect(() => {
    const tmpArr = [] as any
    Promise.all([
      getReadings('bg').then(res => setBgReadings(res)),
      getReadings('bg/stats/3').then(res => tmpArr.push({ created: '3 Day' , ...res }) ),
      getReadings('bg/stats/7').then(res => tmpArr.push({ created: '7 Day', ...res, }) ),
      getReadings('bg/stats/14').then(res => tmpArr.push({ created: '14 Day', ...res, }) ),
      getReadings('bg/stats/30').then(res => tmpArr.push({ created: '30 Day', ...res, }) ),
      getReadings('bg/stats/90').then(res => tmpArr.push({ created: '90 Day', ...res, }) ),
      getReadings('dose').then(res => setDoseReadings(res)),
      getReadings('macro').then(res => setMacroReadings(res))
    ]).then(() => {
      setBgStats(tmpArr.sort(compare))
    })
  }, [])

  return(
    <View style={ScreenStyles.container}>
      <Carousel table={'bg'} Template={BgReading} readings={bgReadings} />
      <Carousel table={'stats'} Template={StatsReading} readings={bgStats} />
      <Carousel table={'dose'} Template={DoseReading} readings={doseReadings} />
      <Carousel table={'macro'} Template={MacroReading} readings={macroReadings} />
    </View>
  )
}
