import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WheelPicker from "../../react-native-wheel-picker-android"

import { clockHours, clockMinutes, generateCreatedDateTime, newDate } from '../../Helpers'

type ModifyTimeSelectorProps = {
  created: Date
  setDateTime: (Dispatch<SetStateAction<Date>>)
}

const ModifyTimeSelector: React.FC<ModifyTimeSelectorProps> = (props: ModifyTimeSelectorProps) => {
  const { created, setDateTime } = props
  const createdDateTime = generateCreatedDateTime(created)
  const createdHours = createdDateTime.hours
  const createdMinutes = createdDateTime.minutes

  const [hours, setHours] = useState(createdHours)
  const [minutes, setMinutes] = useState(createdMinutes)

  useEffect(() => {
    if (hours !== createdHours || minutes !== createdMinutes) {
      const month = createdDateTime.month
      const day = createdDateTime.day
      const date = newDate({ m: month, d: day, h: hours, min: minutes })

      date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000)
      setDateTime(date)
    }
  }, [hours, minutes])

  return(
    <View style={Styles.container}>
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
          style={Styles.time}
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
          style={Styles.time}
        />
      </View>
    </View>
  )
}

export default ModifyTimeSelector


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
