import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WheelPicker } from "../../react-native-wheel-picker-android"

import { clockHours, clockMinutes } from '../../Helpers/General'
import { newDate, getDaysAndMonthsForLastSevenDays } from '../../Helpers/Date'

interface TimeSelectorProps {
  setDateTime: (date: Date) => void
}

const TimeSelector: React.FC<TimeSelectorProps> = (props: TimeSelectorProps) => {
  const { setDateTime } = props

  const time = new Date()
  const hoursNow = time.getHours()
  const minutesNow = time.getMinutes()
  const lastSevenDays = getDaysAndMonthsForLastSevenDays()

  const [selectedDate, setSelectedDate] = useState(0)
  const [hours, setHours] = useState(hoursNow)
  const [minutes, setMinutes] = useState(minutesNow)

  const day = parseInt(lastSevenDays[selectedDate].split(' / ')[0])
  const month = parseInt(lastSevenDays[selectedDate].split(' / ')[1])

  const date = newDate({ m: month, d: day, h: hours, min: minutes })

  if (selectedDate !== 0 || hours !== hoursNow || minutes !== minutesNow) {
    setDateTime(date)
  }

  return(
    <View style={Styles.container}>
      <View style={{...Styles.wheel, paddingRight: 10, borderRightWidth: 0.5}}>
        <WheelPicker
          selectedItem={0}
          data={lastSevenDays}
          onItemSelected={setSelectedDate}
          selectedItemTextSize={20}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          height={100}
          width={84}
        />
      </View>
      <View style={{...Styles.wheel, paddingLeft: 10}}>
        <WheelPicker
          selectedItem={hours}
          data={clockHours}
          onItemSelected={setHours}
          isCyclic={true}
          selectedItemTextSize={20}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          height={100}
          width={42}
        />
      </View>
      <Text style={{ fontSize: 20, textAlignVertical: 'bottom', paddingBottom: 14}}>{':'}</Text>
      <View style={Styles.wheel}>
        <WheelPicker
          selectedItem={minutes}
          data={clockMinutes}
          onItemSelected={setMinutes}
          isCyclic={true}
          selectedItemTextSize={20}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          height={100}
          width={42}
        />
      </View>
    </View>
  )
}

export default TimeSelector


const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  wheel: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignContent: 'flex-end'
  }
})
