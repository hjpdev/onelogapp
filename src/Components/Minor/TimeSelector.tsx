import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WheelPicker } from "../../react-native-wheel-picker-android"

import { clockHours, clockMinutes } from '../../Helpers/General'
import { newDate, getDaysAndMonthsForLastSevenDays } from '../../Helpers/Date'

interface TimeSelectorProps {
  setDateTime: (date: Date | null) => void
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

  const onDateSelected = (index: number) => {
    setSelectedDate(index)

    const dayNow = parseInt(lastSevenDays[0].split(' / ')[0])
    const monthNow = parseInt(lastSevenDays[0].split(' / ')[1])
    const dateNow = newDate({ m: monthNow, d: dayNow, h: hoursNow, min: minutesNow })

    const day = parseInt(lastSevenDays[index].split(' / ')[0])
    const month = parseInt(lastSevenDays[index].split(' / ')[1])
    const date = newDate({ m: month, d: day, h: hours, min: minutes })
    date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000)

    if (date.toString() === dateNow.toString()) {
      return setDateTime(null)
    }

    setDateTime(date)
  }

  const onHoursSelected = (hours: number) => {
    setHours(hours)
    onDateSelected(selectedDate)
  }

  const onMinutesSelected = (minutes: number) => {
    setMinutes(minutes)
    onDateSelected(selectedDate)
  }

  return(
    <View style={Styles.container}>
      <View style={{...Styles.wheel, paddingRight: 10, borderRightWidth: 0.5}}>
        <WheelPicker
          selectedItem={0}
          data={lastSevenDays}
          onItemSelected={onDateSelected}
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
          onItemSelected={onHoursSelected}
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
          onItemSelected={onMinutesSelected}
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
