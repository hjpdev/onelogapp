import React, { useState, useEffect } from 'react'
import { View } from 'react-native'

import BgReading from '../Carousel/Readings/Bg'
import DoseReading from '../Carousel/Readings/Dose'
import MacroReading from '../Carousel/Readings/Macro'
import Carousel from '../Carousel'
import { Stats } from '../Minor/Stats'
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

const statsObj = {
  three: null,
  seven: null,
  fourteen: null,
  thirty: null,
  ninety: null
}

export const HomeScreen: React.FC = () => {
  const [bgReadings, setBgReadings] = useState([])
  const [bgStats, setBgStats] = useState(statsObj)
  const [doseReadings, setDoseReadings] = useState([])
  const [macroReadings, setMacroReadings] = useState([])

  useEffect(() => {
    Promise.all([
      getReadings('bg').then(res => setBgReadings(res)),
      getReadings('bg/stats/3').then(res => statsObj.three = res),
      getReadings('bg/stats/7').then(res => statsObj.seven = res),
      getReadings('bg/stats/14').then(res => statsObj.fourteen = res),
      getReadings('bg/stats/30').then(res => statsObj.thirty = res),
      getReadings('bg/stats/90').then(res => statsObj.ninety = res),
      getReadings('dose').then(res => setDoseReadings(res)),
      getReadings('macro').then(res => setMacroReadings(res))
    ]).then(() => { setBgStats(statsObj) })
  }, [])

  return(
    <View style={ScreenStyles.containerView}>
      <Carousel table={'bg'} Template={BgReading} readings={bgReadings} />
      <Stats days={7} />
      <Carousel table={'dose'} Template={DoseReading} readings={doseReadings} />
      <Carousel table={'macro'} Template={MacroReading} readings={macroReadings} />
    </View>
  )
}
