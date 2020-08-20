import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DatePicker } from "../../react-native-wheel-picker-android"

import { clockMinutes, clockHours } from '../../Helpers/General'
import { generateLastSevenDays } from '../../Helpers/Date'

const TimeInput: React.FC = () => {
  const time = new Date()

  const [date, setDate] = useState(null)

  const [hours, setHours] = useState(time.getHours())
  const [minutes, setMinutes] = useState(time.getMinutes())

  return(
    <View style={Styles.container}>
      {/* <View style={Styles.wheel}>        
        <WheelPicker
          selectedItem={hours}
          data={clockHours}
          onItemSelected={setHours}
          isCyclic={true}
          selectedItemTextSize={20}
          itemTextSize={8}
          selectedItemTextFontFamily={'roboto'}
          itemTextFontFamily={'roboto'}
        />
      </View>
      <View><Text style={{ textAlignVertical: 'center' }}>{':'}</Text></View>
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
        />
      </View> */}
      <DatePicker
        onDateChange={setDate}
        format={'MM/DD'}
        days={generateLastSevenDays()}
        format24={true}
        hideAM={true}
      />
    </View>
  )
}

export default TimeInput


const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  wheel: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    backgroundColor: 'yellow'
  }
})