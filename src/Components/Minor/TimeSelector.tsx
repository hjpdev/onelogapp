import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WheelPicker } from "../../react-native-wheel-picker-android"

import { clockHours, clockMinutes } from '../../Helpers/General'
import { getDaysAndMonthsForLastSevenDays } from '../../Helpers/Date'

const TimeInput: React.FC = () => {
  const time = new Date()

  const [date, setDate] = useState(null)

  const [day, setDay] = useState(time.getDate())
  const [month, setMonth] = useState(time.getMonth() + 1)
  const [hours, setHours] = useState(time.getHours())
  const [minutes, setMinutes] = useState(time.getMinutes())

  console.log(`HERE => ${getDaysAndMonthsForLastSevenDays().months}`)

  return(
    <View style={Styles.container}>
      <View style={Styles.wheel}>
        <WheelPicker
          selectedItem={day}
          // data={getDaysAndMonthsForLastSevenDays().days}
          data={clockHours}
          onItemSelected={setDay}
          isCyclic={true}
          selectedItemTextSize={20}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          height={100}
          width={44}
        />
      </View>
      <Text style={{ fontSize: 20, textAlignVertical: 'bottom', paddingBottom: 14}}>{'/'}</Text>
      <View style={{...Styles.wheel, paddingRight: 10, borderRightWidth: 0.5}}>
        <WheelPicker
          selectedItem={month}
          // data={getDaysAndMonthsForLastSevenDays().months}
          data={clockHours}
          onItemSelected={setMonth}
          isCyclic={true}
          selectedItemTextSize={20}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
          height={100}
          width={44}
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
          width={44}
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
          width={44}
        />
      </View>
    </View>
  )
}

export default TimeInput


const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'green'
  },
  wheel: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    // backgroundColor: 'yellow'
  }
})