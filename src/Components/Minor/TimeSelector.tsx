import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WheelPicker } from "../../react-native-wheel-picker-android"

import { clockHours, clockMinutes } from '../../Helpers/General'
import { newDate, getDaysAndMonthsForLastSevenDays } from '../../Helpers/Date'

type TimeSelectorProps = {
  setDateTime: Dispatch<SetStateAction<Date | null>>
}

const TimeSelector: React.FC<TimeSelectorProps> = (props: TimeSelectorProps) => {
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

  const hoursData = hoursCheck
    ? clockHours.slice(0, new Date().getHours() + 1)
    : clockHours

  const minutesData = minutesCheck
    ? clockMinutes.slice(0, new Date().getMinutes() + 1)
    : clockMinutes

  const isDateDifferentToNow = (date: Date) => {
    const dayNow = parseInt(lastSevenDays[6].split(' / ')[0])
    const monthNow = parseInt(lastSevenDays[6].split(' / ')[1])
    const dateNow = newDate({ m: monthNow, d: dayNow, h: hoursNow, min: minutesNow })

    return date.toString() !== dateNow.toString()
  }

  useEffect(() => {
    const day = parseInt(lastSevenDays[selectedDate].split(' / ')[0])
    const month = parseInt(lastSevenDays[selectedDate].split(' / ')[1])
    const date = newDate({ m: month, d: day, h: hours, min: minutes })

    if (isDateDifferentToNow(date)) {
      date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000)
      return setDateTime(date)
    }
    setDateTime(null)
  }, [selectedDate, hours, minutes])

  return(
    <View style={Styles.container}>
      <View style={{...Styles.wheel, paddingRight: 10, borderRightWidth: 0.5}}>
        <WheelPicker
          selectedItem={selectedDate}
          data={lastSevenDays}
          onItemSelected={setSelectedDate}
          selectedItemTextSize={20}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          style={Styles.date}
        />
      </View>
      <View style={{...Styles.wheel, paddingLeft: 10}}>
        <WheelPicker
          selectedItem={hours}
          data={hoursData}
          onItemSelected={setHours}
          isCyclic={!hoursCheck}
          selectedItemTextSize={20}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          style={Styles.time}
        />
      </View>
      <Text style={{ fontSize: 20, textAlignVertical: 'bottom', paddingBottom: 14}}>{':'}</Text>
      <View style={Styles.wheel}>
        <WheelPicker
          selectedItem={minutes}
          data={minutesData}
          onItemSelected={setMinutes}
          isCyclic={!minutesCheck}
          selectedItemTextSize={20}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          style={Styles.time}
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
  },
  date: {
    height: 100,
    width: 84
  },
  time: {
    height: 100,
    width: 42
  }
})
