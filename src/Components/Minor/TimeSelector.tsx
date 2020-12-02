import React, { Dispatch, ReactText, SetStateAction, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { clockHours, clockMinutes, getDaysAndMonthsForLastSevenDays, newDate } from '../../Helpers'
import { TimeSelectorStyles } from './Styles'

interface TimeSelectorProps {
  setDateTime: Dispatch<SetStateAction<Date | null>>
}

export const TimeSelector: React.FC<TimeSelectorProps> = (props: TimeSelectorProps) => {
  const { setDateTime } = props

  const time = new Date()
  const hoursNow = time.getHours()
  const minutesNow = time.getMinutes()
  const lastSevenDays = getDaysAndMonthsForLastSevenDays().reverse()

  const [selectedDate, setSelectedDate] = useState(6)
  const [hours, setHours] = useState(hoursNow)
  const [minutes, setMinutes] = useState(minutesNow)

  const hoursCheck = selectedDate === 6
  const minutesCheck = hoursCheck && hours === hoursNow

  const hoursData = hoursCheck ? clockHours.slice(0, new Date().getHours() + 1) : clockHours

  const minutesData = minutesCheck ? clockMinutes.slice(0, new Date().getMinutes() + 1) : clockMinutes

  const isDateDifferentToNow = (date: Date) => {
    const dayNow = parseInt(lastSevenDays[6].split(' / ')[0])
    const monthNow = parseInt(lastSevenDays[6].split(' / ')[1])
    const dateNow = newDate({
      m: monthNow,
      d: dayNow,
      h: hoursNow,
      min: minutesNow
    })

    return date.toString() !== dateNow.toString()
  }

  useEffect(() => {
    const day = parseInt(lastSevenDays[selectedDate].split(' / ')[0])
    const month = parseInt(lastSevenDays[selectedDate].split(' / ')[1])
    const date = newDate({
      m: month,
      d: day,
      h: hours,
      min: minutes
    })

    if (isDateDifferentToNow(date)) {
      date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
      return setDateTime(date)
    }
    setDateTime(null)
  }, [selectedDate, hours, minutes])

  const getPickerItems = (items: string[]) => items.map((i) => <Picker.Item key={i} label={`${i}`} value={i} />)

  const onDateSelected = (_: ReactText, index: number) => {
    setSelectedDate(index)
  }

  const onHoursSelected = (hours: ReactText, _: number) => {
    setHours(parseInt(`${hours}`))
  }

  const onMinutesSelected = (minutes: ReactText, _: number) => {
    setMinutes(parseInt(`${minutes}`))
  }

  return (
    <View style={TimeSelectorStyles.container}>
      <View style={TimeSelectorStyles.date}>
        <Picker
          selectedValue={lastSevenDays[selectedDate]}
          style={TimeSelectorStyles.picker}
          itemStyle={TimeSelectorStyles.pickerItem}
          onValueChange={onDateSelected}
        >
          {getPickerItems(lastSevenDays)}
        </Picker>
      </View>
      <Picker
        selectedValue={hoursData[hours]}
        style={TimeSelectorStyles.picker}
        itemStyle={TimeSelectorStyles.pickerItem}
        onValueChange={onHoursSelected}
      >
        {getPickerItems(hoursData)}
      </Picker>
      <View style={TimeSelectorStyles.textContainer}>
        <Text style={TimeSelectorStyles.text}>:</Text>
      </View>
      <Picker
        selectedValue={minutesData[minutes]}
        style={TimeSelectorStyles.picker}
        itemStyle={TimeSelectorStyles.pickerItem}
        onValueChange={onMinutesSelected}
      >
        {getPickerItems(minutesData)}
      </Picker>
    </View>
  )
}
